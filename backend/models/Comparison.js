import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'General' },
  confidence: { type: Number, default: 85 },
  importance: { type: String, default: 'Critical' },
  tip: { type: String }
}, { _id: false });

const comparisonSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  fileSize: {
    type: String,
    default: 'N/A'
  },
  jobDescriptionTitle: {
    type: String,
    default: 'Custom Job Description',
    trim: true
  },
  jobDescriptionText: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  verdict: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    default: ''
  },
  engine: {
    type: String,
    default: 'Gemini AI'
  },
  presentSkills: [skillItemSchema],
  missingSkills: [skillItemSchema],
  breakdown: {
    keywordMatch: { type: Number, default: 0 },
    technicalDepth: { type: Number, default: 0 },
    readabilityScore: { type: Number, default: 0 },
    impactMetrics: { type: Number, default: 0 }
  },
  recommendations: [{ type: String }],
  extractedResumeLength: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for chronological history queries
comparisonSchema.index({ createdAt: -1 });

export const Comparison = mongoose.model('Comparison', comparisonSchema);
