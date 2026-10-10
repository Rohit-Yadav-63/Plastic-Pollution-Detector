const KEY="plastic-pollution-analyzer.analyses";
export function getAnalyses(){try{const x=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(x)?x:[]}catch{return[]}}
export function saveAnalysis(x){try{localStorage.setItem(KEY,JSON.stringify([x,...getAnalyses().filter(y=>y.id!==x.id)].slice(0,20)));return true}catch{return false}}
export function clearHistory(){localStorage.removeItem(KEY)}