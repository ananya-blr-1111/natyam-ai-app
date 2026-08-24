export type AnalysisResult = {
  result: string;
  score: number;
  thumbnail: string | null;
  created_at: string;
};

let _pending: AnalysisResult | null = null;

export const analysisStore = {
  set:   (data: AnalysisResult) => { _pending = data; },
  get:   () => _pending,
  clear: () => { _pending = null; },
};
