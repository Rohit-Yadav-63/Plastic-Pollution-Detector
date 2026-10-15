import test from "node:test";
import assert from "node:assert/strict";
import {
  extractExifMetadata,
  requestCurrentDeviceLocation,
} from "../src/services/metadataService.js";
class TestFileReader {
  addEventListener(name, fn) {
    this["on" + name] = fn;
  }
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(
      (result) => {
        this.result = result;
        const event = { target: this };
        this.onload?.(event);
        this.onloadend?.(event);
      },
      (error) => {
        this.error = error;
        this.onerror?.({ target: this });
      },
    );
  }
}
globalThis.FileReader = TestFileReader;
function fixture({ gps = true } = {}) {
  const exifOffset = gps ? 38 : 26,
    dateOffset = exifOffset + 18,
    gpsOffset = dateOffset + 20,
    latOffset = gpsOffset + 54,
    lonOffset = latOffset + 24,
    tiff = Buffer.alloc(gps ? lonOffset + 24 : dateOffset + 20);
  tiff.write("II", 0, "ascii");
  tiff.writeUInt16LE(42, 2);
  tiff.writeUInt32LE(8, 4);
  tiff.writeUInt16LE(gps ? 2 : 1, 8);
  function entry(offset, tag, type, count, value) {
    tiff.writeUInt16LE(tag, offset);
    tiff.writeUInt16LE(type, offset + 2);
    tiff.writeUInt32LE(count, offset + 4);
    tiff.writeUInt32LE(value, offset + 8);
  }
  entry(10, 0x8769, 4, 1, exifOffset);
  if (gps) entry(22, 0x8825, 4, 1, gpsOffset);
  tiff.writeUInt32LE(0, gps ? 34 : 22);
  tiff.writeUInt16LE(1, exifOffset);
  entry(exifOffset + 2, 0x9003, 2, 20, dateOffset);
  tiff.writeUInt32LE(0, exifOffset + 14);
  tiff.write("2024:05:17 14:23:08\0", dateOffset, "ascii");
  if (gps) {
    tiff.writeUInt16LE(4, gpsOffset);
    entry(gpsOffset + 2, 1, 2, 2, 0x4e);
    entry(gpsOffset + 14, 2, 5, 3, latOffset);
    entry(gpsOffset + 26, 3, 2, 2, 0x45);
    entry(gpsOffset + 38, 4, 5, 3, lonOffset);
    tiff.writeUInt32LE(0, gpsOffset + 50);
    [
      [37, 1],
      [48, 1],
      [30, 1],
      [122, 1],
      [25, 1],
      [10, 1],
    ].forEach((v, i) => {
      const offset = i < 3 ? latOffset + i * 8 : lonOffset + (i - 3) * 8;
      tiff.writeUInt32LE(v[0], offset);
      tiff.writeUInt32LE(v[1], offset + 4);
    });
  }
  const payload = Buffer.concat([Buffer.from("Exif\0\0", "binary"), tiff]),
    segment = Buffer.alloc(payload.length + 4);
  segment[0] = 0xff;
  segment[1] = 0xe1;
  segment.writeUInt16BE(payload.length + 2, 2);
  payload.copy(segment, 4);
  return new Blob(
    [Buffer.from([0xff, 0xd8]), segment, Buffer.from([0xff, 0xd9])],
    { type: "image/jpeg" },
  );
}
test("extracts EXIF capture time and GPS from a JPEG", async () => {
  const data = await extractExifMetadata(fixture());
  assert.equal(data.photoCaptureDate, "2024-05-17T14:23:08");
  assert.equal(data.photoGpsAvailable, true);
  assert.ok(Math.abs(data.photoGps.latitude - 37.808333) < 0.00001);
  assert.ok(Math.abs(data.photoGps.longitude - 122.419444) < 0.00001);
});
test("handles EXIF photos without GPS and files without EXIF", async () => {
  const noGps = await extractExifMetadata(fixture({ gps: false }));
  assert.equal(noGps.photoCaptureDate, "2024-05-17T14:23:08");
  assert.equal(noGps.photoGps, null);
  assert.equal(noGps.photoGpsAvailable, false);
  const none = await extractExifMetadata(
    new Blob([Buffer.from([0xff, 0xd8, 0xff, 0xd9])], { type: "image/jpeg" }),
  );
  assert.equal(none.photoCaptureDate, null);
  assert.equal(none.photoGpsAvailable, false);
});
test("handles permitted and denied device geolocation", async () => {
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: {
      geolocation: {
        getCurrentPosition: (success) =>
          success({
            coords: { latitude: 12.9, longitude: 77.6, accuracy: 20 },
          }),
      },
    },
  });
  assert.deepEqual(
    await requestCurrentDeviceLocation().then((x) => ({
      latitude: x.latitude,
      longitude: x.longitude,
    })),
    { latitude: 12.9, longitude: 77.6 },
  );
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: {
      geolocation: {
        getCurrentPosition: (success, error) => error({ code: 1 }),
      },
    },
  });
  await assert.rejects(requestCurrentDeviceLocation(), /permission was denied/);
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: {},
  });
  await assert.rejects(requestCurrentDeviceLocation(), /unavailable/);
});
