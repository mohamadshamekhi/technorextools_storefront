import type { ArticleBlock } from '../../types';

/** Renders an article's block list as semantic prose (h2 + p pairs). */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) =>
        block.h ? (
          <h2 key={index} className="mt-3 text-xl font-black tracking-tight text-balance">
            {block.h}
          </h2>
        ) : (
          <p key={index} className="text-foreground-muted text-[15px] leading-loose text-pretty">
            {block.p}
          </p>
        ),
      )}
    </div>
  );
}
