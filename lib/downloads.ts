export const windowsDownload = {
  id: "windows",
  name: "Windows",
  requirement: "Windows 10 & 11 · 64-bit",
  version: "v1.4.9",
  format: ".exe installer",
  filename: "aetheria-ai-Setup-1.4.9.exe",
  href: "https://github.com/GodBoii/AI-OS-website/releases/download/v1.4.9/aetheria-ai-Setup-1.4.9.exe",
};

export const androidDownload = {
  id: "android",
  name: "Android",
  requirement: "Android 6.0 & above · All supported architectures",
  version: "v1.1",
  format: "Signed universal APK",
  filename: "aetheria-ai-1.1.0-universal.apk",
  href: "https://github.com/GodBoii/AI-OS-website/releases/download/android-v1.1.0/aetheria-ai-1.1.0-universal.apk",
  releaseHref: "https://github.com/GodBoii/AI-OS-website/releases/tag/android-v1.1.0",
};

export const downloads = [
  windowsDownload,
  {
    id: "linux",
    name: "Linux",
    requirement: "Linux desktop · AppImage",
    version: "v1.2.0",
    format: ".AppImage",
    href: "https://github.com/GodBoii/AI-OS-website/releases/download/v1.2.0/Aetheria.AI-1.2.0.AppImage",
  },
  androidDownload,
];
