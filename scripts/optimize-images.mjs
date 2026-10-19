/**
 * Converte as imagens de images-src/ (png, jpg, jpeg) em WebP otimizado
 * dentro de public/img/, em várias larguras para uso com srcset.
 *
 * Uso: npm run images
 * Saída: public/img/<nome>-<largura>.webp  (ex.: larissa-monteiro-800.webp)
 */
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "images-src";
const OUT_DIR = "public/img";
const WIDTHS = [480, 800];
const QUALITY = 80;

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;
  const input = sharp(path.join(SRC_DIR, file));
  const { width: originalWidth, height: originalHeight } = await input.metadata();

  for (const width of WIDTHS) {
    if (width > originalWidth) continue;
    const out = path.join(OUT_DIR, `${name}-${width}.webp`);
    const info = await input.clone().resize({ width }).webp({ quality: QUALITY }).toFile(out);
    console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }

  console.log(`  original: ${originalWidth}x${originalHeight}`);
}
