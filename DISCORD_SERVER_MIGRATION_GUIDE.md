# Discord Server Migration Guide

This document identifies all hardcoded Discord server-specific values that need to be updated when deploying this bot to a different Discord server.

## Environment Variables

**File: `src/helpers/env.ts`**
- Set `GUILD_ID` environment variable to your target Discord server ID

## Channel IDs

**File: `src/constants/channels.ts`**

### Production Channels (Lines 25-44)
All channel IDs in the `PRODUCTION_CHANNELS` object need to be replaced:
- `helpReact: "103696749012467712"`
- `helpThreadsReact: "902647189120118794"`
- `helpJs: "565213527673929729"`
- `random: "103325358643752960"`
- `gaming: "509219336175747082"`
- `thanks: "798567961468076072"`
- `jobBoard: "103882387330457600"`
- `resumeReview: "955507127877791795"`
- `lookingForGroup: "1255898446158757939"`
- `jobsLog: "989201828572954694"`
- `events: "127442949435817984"`
- `iBuiltThis: "312761588778139658"`
- `iWroteThis: "918616846100492298"`
- `twitterFeed: "951207372125274112"`
- `techReadsAndNews: "105816607976095744"`
- `modLog: "591326408396111907"`
- `botLog: "701462381703856158"`
- `vcLog: "1237161125473161347"`

### Local Development Channels (Lines 4-23)
All channel IDs in the `LOCAL_CHANNELS` object need to be replaced with your test server channels:
- `helpReact: "926931785219207301"`
- `helpThreadsReact: "950790460857794620"`
- `helpJs: "950790460857794620"`
- `random: "926931785219207301"`
- `gaming: "926931785219207301"`
- `thanks: "926931785219207301"`
- `jobBoard: "925847361996095509"`
- `resumeReview: "1166075559172907008"`
- `lookingForGroup: "1166085100493078590"`
- `jobsLog: "925847644318879754"`
- `events: "950790520811184150"`
- `iBuiltThis: "950790520811184150"`
- `iWroteThis: "950790520811184150"`
- `twitterFeed: "950790520811184150"`
- `techReadsAndNews: "950790520811184150"`
- `modLog: "925847644318879754"`
- `botLog: "916081991542276096"`
- `vcLog: "1237103703740121201"`

## Role IDs

**File: `src/constants/channels.ts`**

### Production Roles (Lines 54-59)
All role IDs in the `PRODUCTION_ROLES` object need to be replaced:
- `starHelper: "852537681346691102"`
- `mvp: "340332804611244043"`
- `moderator: "102870499406647296"`
- `admin: "103261043291082752"`

### Local Development Roles (Lines 48-53)
All role IDs in the `LOCAL_ROLES` object need to be replaced:
- `starHelper: "932749426785665136"`
- `mvp: "932749517290344488"`
- `moderator: "916797467918471190"`
- `admin: "916797467918471190"`

**File: `src/constants.ts`**
- Line 1: `modRoleId = "&102870499406647296"` - Replace with your server's moderator role ID

## Hardcoded Channel Mentions in Messages

**File: `src/features/scheduled-messages.ts`**

### Lines 101-112 - Help Channel References
Replace all hardcoded channel mentions with your server's channel IDs:
```
<#565213527673929729> For questions about pure Javascript problems.
<#105765765117935616> For questions about CSS or other visual problems.
<#145170347921113088> For questions about issues with your server code.
<#105765859191975936> Get deeper review of a snippet of code.
<#287623405946011648> If you have a question about your job or career, ask it in here.
<#547620660482932737> Discussion of non-JS code, or that new laptop you're deciding on.
<#108428584783220736> for questions about building, linting, generating, or otherwise processing your code.
<#103882387330457600> Job board channel
<#798567961468076072> Thanks/shoutout channel
```

## Server-Specific URLs and Branding

Replace all Reactiflux-specific URLs and references throughout the codebase:

### URLs to Replace
- `https://www.reactiflux.com/conduct` → Your server's code of conduct
- `https://www.reactiflux.com/promotion` → Your server's promotion guidelines
- `https://www.reactiflux.com/jobs` → Your server's jobs page
- `https://www.reactiflux.com/learning` → Your server's learning resources
- `https://reactiflux.com/contact` → Your server's contact form
- `hello@reactiflux.com` → Your server's contact email

### Files Containing These References
- `src/features/commands.ts` (multiple instances)
- `src/features/scheduled-messages.ts` (multiple instances)
- `src/features/jobs-moderation.ts` (guidance URL)

## Channel Purpose Mapping

When creating channels in your new server, ensure they serve the same purposes:

| Channel Constant | Purpose |
|-----------------|---------|
| `helpReact` | React-specific help questions |
| `helpThreadsReact` | React help with thread support |
| `helpJs` | Pure JavaScript questions |
| `random` | General discussion |
| `gaming` | Gaming discussions |
| `thanks` | Appreciation messages |
| `jobBoard` | Job postings |
| `resumeReview` | Resume feedback |
| `lookingForGroup` | Finding project partners |
| `jobsLog` | Job posting moderation logs |
| `events` | Server events |
| `iBuiltThis` | Project showcases |
| `iWroteThis` | Article/blog sharing |
| `twitterFeed` | Twitter feed integration |
| `techReadsAndNews` | Tech news sharing |
| `modLog` | Moderation activity logs |
| `botLog` | Bot activity logs |
| `vcLog` | Voice channel activity logs |

## Required Permissions

Ensure the bot has the following permissions in your Discord server:
- Read Messages/View Channels
- Send Messages
- Manage Messages
- Add Reactions
- Use Slash Commands
- Connect (for voice channels)
- View Audit Log (for moderation features)

## Testing Checklist

After updating all values:
1. ✅ Bot connects to your server
2. ✅ All channel references work
3. ✅ Role-based permissions function correctly
4. ✅ Scheduled messages post to correct channels
5. ✅ Moderation features work with your role structure
6. ✅ All URL references point to your resources
7. ✅ Job board moderation functions properly
8. ✅ Voice activity logging works (if using voice channels)