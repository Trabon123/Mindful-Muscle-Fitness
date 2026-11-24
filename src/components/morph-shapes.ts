/**
 * Hand-drawn line shapes for the Mind ⇄ Muscle morph (viewBox 0 0 400 300).
 * Each is one compound path so MorphSVG can interpolate subpath-to-subpath.
 */
export const shapes = {
  brain: [
    // outer silhouette
    'M120 190C86 186 70 152 84 126C78 96 104 70 134 73C150 50 186 45 206 59C226 43 266 49 276 73C306 71 331 96 322 126C340 152 325 186 295 191C290 211 265 223 245 213C230 229 200 229 190 213C170 223 140 216 134 201C127 200 122 196 120 190Z',
    // gyri
    'M150 100C166 94 176 110 166 122C158 132 170 146 186 141',
    'M206 72C200 96 215 111 236 106C256 101 263 121 250 136',
    'M282 108C266 124 276 150 296 150',
    'M118 150C140 149 151 165 141 181',
    'M200 152C190 171 210 190 231 181C246 173 261 181 263 196',
    // stem
    'M232 216C234 235 238 248 246 260',
  ].join(''),
  fiber: [
    // muscle belly
    'M62 150C122 92 278 92 338 150C278 208 122 208 62 150Z',
    // fascicles
    'M84 150C144 118 256 118 316 150',
    'M84 150C144 182 256 182 316 150',
    'M98 150L302 150',
    // striations
    'M170 111C164 138 164 162 170 189',
    'M230 111C236 138 236 162 230 189',
    // tendons
    'M22 150L62 150',
  ].join(''),
  barbell: [
    // left plates
    'M78 92L100 92L100 208L78 208Z',
    'M104 108L120 108L120 192L104 192Z',
    'M124 138L132 138L132 162L124 162Z',
    // right plates
    'M300 92L322 92L322 208L300 208Z',
    'M280 108L296 108L296 192L280 192Z',
    'M268 138L276 138L276 162L268 162Z',
    // bar
    'M28 150L372 150',
  ].join(''),
} as const;

export type ShapeName = keyof typeof shapes;
