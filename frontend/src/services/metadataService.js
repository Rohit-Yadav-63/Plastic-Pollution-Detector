import { parse as parseExif } from "exifr/dist/full.esm.mjs";
export function parseCaptureDate(value) {
  if (!value) return null;
  if (value instanceof Date && Number.isFinite(value.getTime()))
    return value.toISOString();
  const source = String(value).trim(),
    normalized = source.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3");
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(normalized))
    return normalized.replace(" ", "T");
  const date = new Date(normalized);
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}
export function validCoordinates(latitude, longitude) {
  const lat = Number(latitude),
    lon = Number(longitude);
  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    Math.abs(lat) > 90 ||
    Math.abs(lon) > 180
  )
    return null;
  return { latitude: lat, longitude: lon };
}
export async function extractExifMetadata(file) {
  const tags = await parseExif(file, {
      tiff: true,
      exif: true,
      gps: true,
      reviveValues: false,
    }).catch(() => null),
    photoGps = validCoordinates(tags?.latitude, tags?.longitude);
  return {
    photoCaptureDate: parseCaptureDate(
      tags?.DateTimeOriginal || tags?.CreateDate,
    ),
    photoGps,
    photoGpsAvailable: Boolean(photoGps),
  };
}
async function readDimensions(file) {
  try {
    const bitmap = await createImageBitmap(file),
      dimensions = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return dimensions;
  } catch {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file),
        image = new Image();
      image.onload = () => {
        resolve({ width: image.naturalWidth, height: image.naturalHeight });
        URL.revokeObjectURL(url);
      };
      image.onerror = () => {
        resolve({ width: null, height: null });
        URL.revokeObjectURL(url);
      };
      image.src = url;
    });
  }
}
export async function readImageMetadata(file) {
  const [exif, dimensions] = await Promise.all([
    extractExifMetadata(file),
    readDimensions(file),
  ]);
  return {
    fileName: file.name,
    fileSizeBytes: file.size,
    mimeType: file.type || "unknown",
    width: dimensions.width,
    height: dimensions.height,
    ...exif,
    photoGpsOmittedForPrivacy: false,
    manualLocationName: "",
    currentDeviceLocation: null,
    currentDeviceLocationAvailable: false,
    currentDeviceLocationOmittedForPrivacy: false,
  };
}
export function requestCurrentDeviceLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location services are unavailable in this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = validCoordinates(coords.latitude, coords.longitude);
        if (!location) {
          reject(new Error("The device returned invalid coordinates."));
          return;
        }
        resolve({
          ...location,
          accuracy: coords.accuracy,
          capturedAt: new Date().toISOString(),
        });
      },
      (error) => {
        const messages = {
          1: "Location permission was denied. You can continue without device location.",
          2: "The device could not determine its location.",
          3: "The location request timed out. Please try again.",
        };
        reject(
          new Error(messages[error.code] || "Could not read device location."),
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 },
    );
  });
}
