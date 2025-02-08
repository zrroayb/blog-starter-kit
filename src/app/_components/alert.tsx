import Container from "./container";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return (
    <div className="border-b bg-neutral-50 border-neutral-200 dark:border-slate-700 dark:bg-slate-800">
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{" "}
              <a
                href="/api/exit-preview"
                className="underline hover:text-blue-600 duration-200 transition-colors"
              >
                Click here
              </a>{" "}
              to exit preview mode.
            </>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
