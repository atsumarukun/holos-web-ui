export const buildPreviewSrc = (
  volumeName: string,
  entryKey: string,
): string => {
  return `/api/storage/entries/${volumeName}/${entryKey}`;
};
