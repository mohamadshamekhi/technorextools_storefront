/** Feature-detect WebGL without keeping a context alive. */
export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Android Scene Viewer intent for a GLB; iOS Quick Look needs a USDZ we don't have. */
export function androidArHref(glbUrl: string, title: string): string | null {
  if (!/android/i.test(navigator.userAgent)) return null;
  const file = new URL(glbUrl, window.location.origin).toString();
  const fallback = encodeURIComponent(window.location.href);
  return (
    `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(file)}&mode=ar_preferred` +
    `&title=${encodeURIComponent(title)}#Intent;scheme=https;package=com.google.ar.core;` +
    `action=android.intent.action.VIEW;S.browser_fallback_url=${fallback};end;`
  );
}
