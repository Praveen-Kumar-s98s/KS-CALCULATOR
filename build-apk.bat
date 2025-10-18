@echo off
echo Building KS Jewellery Calculator APK...
echo.

echo Step 1: Building React app...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Copying to Android...
call npx cap copy
if %errorlevel% neq 0 (
    echo Copy failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Opening Android Studio...
call npx cap open android

echo.
echo APK generation process started!
echo Follow these steps in Android Studio:
echo 1. Wait for Gradle sync to complete
echo 2. Go to Build ^> Build Bundle(s) ^> Build APK(s)
echo 3. Or Build ^> Generate Signed Bundle/APK for release
echo.
echo The APK will be generated in: android\app\build\outputs\apk\
echo.
pause
