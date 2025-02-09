import markdownStyles from "./markdown-styles.module.css";

interface PostBodyProps {
  content: string;
}

export function PostBody({ content }: PostBodyProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="prose prose-lg prose-blue mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
