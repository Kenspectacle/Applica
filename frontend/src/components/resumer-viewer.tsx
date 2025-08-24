interface ResumeViewerProps {
  url: string;
}

export const ResumeViewer = ({ url }: ResumeViewerProps) => {
  return (
    <iframe
      src={url}
      width="100%"
      height="600px"
      style={{ border: '1px solid #ccc' }}
      title="Resume Viewer"
    />
  );
};