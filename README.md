# Smart Rehab App

Mobile app for the Smart Rehab knee brace (SDU, EXT E26 team project). The brace has sensors (IMUs, potentiometer, EMG, pressure film) and will send data over Bluetooth to this app.

Current status: UI only with mock data. No real Bluetooth yet.

Stack: Expo SDK 57, React Native, TypeScript, Expo Router (file-based routing in `src/app/`).

## Prerequisites (Windows)

Install Node.js LTS and Git:

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
```

Close and reopen PowerShell, then check:

```powershell
node -v
git --version
```

Android Studio is optional. You only need it to run an Android emulator (see [Android emulator](#android-emulator-windows)).

### PowerShell execution policy

If `npm` or `npx` fails with "running scripts is disabled on this system", run once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Or use `npm.cmd` and `npx.cmd` instead of `npm` and `npx`.

## Setup

Clone with SSH:

```powershell
git clone git@github.com:Smart-Rehab-E26/smart-rehab-app.git
```

Or with HTTPS:

```powershell
git clone https://github.com/Smart-Rehab-E26/smart-rehab-app.git
```

Install dependencies:

```powershell
cd smart-rehab-app
npm install
```

## Run

```powershell
npx expo start
```

Then:

- Press `a` to open the Android emulator.
- Press `w` to open in a web browser.
- Or scan the QR code with the Expo Go app on your phone.

### Expo Go on a phone

- Phone and PC must be on the same Wi-Fi.
- If Windows Firewall asks, allow Node.js on private networks.
- If the network blocks the connection (for example university Wi-Fi), use a tunnel:

```powershell
npx expo start --tunnel
```

Expo Go may ask you to sign in. Create a free account at https://expo.dev, then:

```powershell
npx expo login
```

Sign in to the same account in Expo Go.

## Android emulator (Windows)

1. Install Android Studio:

   ```powershell
   winget install Google.AndroidStudio
   ```

2. Open Android Studio. On first launch choose Standard setup and accept the licenses.
3. Create a virtual device: More Actions > Virtual Device Manager > +. Pick a Pixel device with the latest Google Play image.
4. Set `ANDROID_HOME` and `PATH`:

   ```powershell
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
   [Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";$env:LOCALAPPDATA\Android\Sdk\platform-tools;$env:LOCALAPPDATA\Android\Sdk\emulator", "User")
   ```

5. Close and reopen the terminal.
6. Start the emulator from the Virtual Device Manager, then check that it is detected:

   ```powershell
   adb devices
   ```

If the emulator complains about hardware acceleration, enable "Windows Hypervisor Platform" in Windows Features (search "Turn Windows features on or off") and restart.

## iOS

iOS apps cannot be built on Windows. Windows users test on an iPhone with Expo Go only (see [Expo Go on a phone](#expo-go-on-a-phone)).

### Mac (Victor only)

Install Xcode from the App Store, connect the iPhone, then:

```bash
npx expo run:ios --device
```

Builds signed with a free Apple ID expire after 7 days and must be reinstalled.

## Bluetooth (later)

When Bluetooth (`react-native-ble-plx`) is added, Expo Go will no longer work. You will need a development build: `npx expo run:android` on Windows, or the Mac for iOS.

## Before pushing

```powershell
npx tsc --noEmit
npx expo lint
```

To add a dependency, use `npx expo install <package>` instead of `npm install <package>`. It picks versions compatible with the Expo SDK.

## Project structure

```
src/
  app/                 Screens (Expo Router, file-based routing)
    _layout.tsx        Root layout
    index.tsx          Summary
    exercises.tsx      Exercises
    progress.tsx       Progress
  components/          UI components (charts.tsx, widget.tsx, screen.tsx, app-tabs.tsx, app-tabs.web.tsx)
  sensors/
    types.ts           SensorReading and SensorSource interface
    mock-sensor-source.ts  Mock sensor data source
  hooks/
    use-sensor.ts      The one place to swap the mock source for a BLE source
  data/
    mock-data.ts       All placeholder data
  constants/
    theme.ts           Colors and theme
```
