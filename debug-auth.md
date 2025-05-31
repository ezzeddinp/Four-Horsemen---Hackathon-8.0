# 🔍 Authentication Flow Debug Guide

## Current Issue

- "Already Have an Account" button gives instant access to dummy account
- User stays logged in even after reload
- Should redirect to login screen instead

## Added Debug Features

### 1. **Profile Page Debug Options** (4 buttons now available):

- **Logout**: Normal logout (keeps Supabase session in storage)
- **Complete Logout**: Clears Supabase sessions
- **Reset App & Show Onboarding**: Resets app state + logout
- **🔧 FORCE RESET**: Nuclear option - clears ALL data

### 2. **Debug Logging Added**:

- `app/index.tsx`: Logs authentication and app state
- `login.tsx`: Shows if user is already authenticated when login loads
- `OnboardingGetStarted.tsx`: Forces logout before navigating to login

## Testing Steps

### Step 1: Check Current State

1. Open the app
2. Check console logs for authentication status
3. If you see "User already authenticated" in login screen - that's the issue!

### Step 2: Fix the Login Loop

1. Go to Profile page
2. Use "🔧 FORCE RESET" button
3. This will completely clear all data and restart the app flow

### Step 3: Test Proper Flow

1. After force reset, you should see: Splash → Onboarding
2. Click "Already Have an Account"
3. Should now go to Login screen (not auto-login)
4. Check console - should show "no existing authentication"

### Step 4: Test Login

1. Try logging in with actual credentials
2. Should work normally and take you to main app

## Root Cause

Supabase automatically persists authentication sessions in AsyncStorage. When you reload the app, it restores the previous session, bypassing the login screen.

## The Fix

The new code:

1. **Detects existing sessions** when navigating to login from onboarding
2. **Forces logout** before showing login screen
3. **Provides multiple reset options** for testing
4. **Adds comprehensive logging** to understand what's happening

## If Still Having Issues

Use the "🔧 FORCE RESET" button - this is the nuclear option that will:

- Clear ALL AsyncStorage data
- Sign out from Supabase completely
- Reset app to fresh install state
- Take you through proper flow: Splash → Onboarding → Auth
