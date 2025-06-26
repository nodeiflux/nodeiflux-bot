import { ChannelType, EmbedType, Message } from "discord.js";
import cooldown from "./cooldown.js";
import type { ChannelHandlers } from "../types/index.d.ts";
import dedent from "dedent";

export const EMBED_COLOR = 7506394;

type Categories = "Node.js" | "Communication" | "Web";

type Command = {
  words: string[];
  help: string;
  category: Categories;
  handleMessage: (msg: Message) => void;
  cooldown?: number;
};

const sortedCategories: Categories[] = ["Node.js", "Communication", "Web"];

const commandsList: Command[] = [
  {
    words: [`!commands`],
    help: `lists all available commands`,
    category: "Node.js",
    handleMessage: (msg) => {
      const commandsMessage = createCommandsMessage();

      msg.reply({
        embeds: [
          {
            title: "Available Help Commands",
            type: EmbedType.Rich,
            description: commandsMessage,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!conduct`],
    help: `informs user's of code of conduct`,
    category: "Node.js",
    handleMessage: (msg) => {
      msg.reply({
        embeds: [
          {
            title: "Code of Conduct",
            type: EmbedType.Rich,
            description: `This Node.js Discord is the official Discord community of the OpenJS Foundation. Please read the [full Node.js Code of Conduct](https://github.com/nodejs/admin/blob/HEAD/CODE_OF_CONDUCT.md) and [moderation policy](https://github.com/nodejs/admin/blob/HEAD/Moderation-Policy.md). This Discord is moderated by an independent team subject to oversight by the OpenJS Foundation Moderation Team.`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!promotion`],
    help: `informs user's of self-promotion guidelines`,
    category: "Node.js",
    handleMessage: (msg) => {
      msg.reply({
        embeds: [
          {
            title: "Self Promotion",
            type: EmbedType.Rich,
            description: `The Node.js Discord is a peer group, not an advertising channel or a free audience. Please review [our guidelines around self-promotion](https://github.com/nodeiflux/documents/blob/main/promotion.md)`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!xy`],
    help: `explains the XY problem`,
    category: "Communication",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "The XY Issue",
            type: EmbedType.Rich,
            description: `You may be experiencing an [XY problem](http://xyproblem.info/). Try to explain your end goal, instead of the error you got stuck on. Maybe there's a better way to approach the problem.`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!ask`],
    help: `explains how to ask questions`,
    category: "Node.js",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "Asking to ask",
            type: EmbedType.Rich,
            description: `Instead of asking to ask, ask your question instead. People can help you better if they know your question.

Bad: "hey can anyone help me?"
Bad: "anyone good with redux?"
Good:
> I'm trying to fire a redux action from my component, but it's not getting to the reducer.
> \`\`\`js
> // snippet of code
> \`\`\`
> I'm seeing an error, but I don't know if it's related.
> \`Uncaught TypeError: undefined is not a function\`

Have a look at these resources on how to ask good questions:
- [Coding Killed the Cat: "How to Ask for Programming Help"](http://wp.me/p2oIwo-26)
- [Stack Overflow: "How do I ask a good question?"](https://stackoverflow.com/help/how-to-ask)
- [Eric S. Raymond; "How To Ask Questions The Smart Way"](https://git.io/JKscV)
`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!code`, `!gist`],
    help: `explains how to attach code`,
    category: "Node.js",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "Attaching Code",
            image: {
              url: "https://media1.tenor.com/images/a23c33a91cb8d026b83488f1673495fd/tenor.gif?itemid=27632534",
            },
            type: EmbedType.Rich,
            description: `
Please don't post code in screenshots or post unformatted code. Instead, use one of these preferred methods to share code:

\\\`\\\`\\\`js
// short code snippets go here
\\\`\\\`\\\`

Please look at the gif attached below
Link a Gist to upload entire files: https://gist.github.com
Link a Code Sandbox to share runnable examples: https://codesandbox.io/s
Link a Code Sandbox to an existing GitHub repo: https://codesandbox.io/s/github/<username>/<reponame>
Link a TypeScript Playground to share types: https://www.typescriptlang.org/play
Link a Snack to share React Native examples: https://snack.expo.io
`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!ping`],
    help: `explains how to ping politely`,
    category: "Node.js",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "Don’t ping or DM other devs you aren’t actively talking to",
            type: EmbedType.Rich,
            description: `It’s very tempting to try to get more attention to your question by @-mentioning one of the high profile(or recently active) members of the Node.js Discord, but please don’t. They may not actually be online, they may not be able to help, and they may be in a completely different timezone–nobody likes push notifications at 3am from an impatient stranger.

Similarly, don’t DM other members without asking first. All of the same problems as @-mentioning apply, and private conversations can’t help anyone else. Your questions are likely not unique, and other people can learn from them when they’re kept public.`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!appideas`],
    help: `provides a link to the best curated app ideas for beginners to advanced devs`,
    category: "Web",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "Florinpop17s Curated App Ideas!",
            type: EmbedType.Rich,
            description: `Sometimes it's tough finding inspiration, luckily this guy listed a bunch of stuff for you to pick from for your next project!  Well sorted progression to confidence in web dev.

          https://github.com/florinpop17/app-ideas
          `,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!cors`],
    help: `provides a link to what CORS is and how to fix it`,
    category: "Web",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "Understanding CORS",
            type: EmbedType.Rich,
            description: `Cross-Origin Resource Sharing (CORS) is a mechanism that lets remote servers restrict which origin (i.e your website) can access it.

Read more:
- [BTM's "Understanding CORS"](https://medium.com/@baphemot/understanding-cors-18ad6b478e2b)
- [A Guide to Cross-Origin Resource Sharing](https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/)
- [How to win at CORS](https://jakearchibald.com/2021/cors/)
          `,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!jwt`],
    help: `Describes reasoning for and against the use of JWT tokens againt using standard sessions`,
    category: "Web",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title:
              "Is JWT the right approach for my application's authentication?",
            type: EmbedType.Rich,
            description: `
Most of the time, JWTs aren't the best approach for working with backend authentication, despite the multitude of tutorials that use JWT. Sessions have been used for decades, with a lot of back end frameworks supporting them out of the box.

That said there are also scenarios when using a JWT token is the best approach:

- When using a third party auth service ( OpenID, Auth0, Firestore)
- Service to service calls
- Distributed architectures ( i.e Microservices)

See below to help you decide which works best for you:

- [JWT is a Bad Default - Evert Pot](https://evertpot.com/jwt-is-a-bad-default)
- [JWT are Dangerous for User Sessions - Raja Rao](https://redis.com/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions)
- [Authentication Cheat Sheet - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Session Management Cheat Sheet - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [JSON Web Token Cheat Sheet for Java - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [Gist - samsch](https://gist.github.com/samsch/a5c99b9faaac9f131967e8a6d61682b0)
            `,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!formatting`, `!prettier`],
    help: `describes Prettier and explains how to use it to format code`,
    category: "Node.js",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "Formatting code with Prettier",
            type: EmbedType.Rich,
            description: `Inconsistent indentation and syntax can make it more difficult to understand code, create churn from style debates, and cause logic and syntax errors.

Prettier is a modern and well-supported formatter that completely reformats your code to be more readable and follow best practices.

To format some code without installing anything, use the playground: https://prettier.io/playground/
To enforce its style in your projects, use the CLI: https://prettier.io/docs/en/install.html
To integrate it into your editor: https://prettier.io/docs/en/editors.html`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!gender`],
    help: `reminds users to use gender-neutral language`,
    category: "Communication",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "Please use gender neutral language by default",
            type: EmbedType.Rich,
            description: `Unless someone has made their pronouns known, please use gender neutral language.

- Instead of "hey guys," try "hey folks", "hey all", or similar
- Use "they/them/theirs" if you aren't sure of someone's pronouns
- "thanks friend" instead of "thanks man"`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!nw`, `!notworking`],
    help: `gives some tips on how to improve your chances at getting an answer`,
    category: "Communication",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "State your problem",
            type: EmbedType.Rich,
            description: `To improve your chances at getting help, it's important to describe the behavior you're seeing and how it differs from your expectations. Simply saying something "doesn't work" requires too many assumptions on the helper's part, and could lead both of you astray.

Instead:
- Tell us what you're trying to do.
- Show us what you did with code.
- Tell us what happened. Show us errors. Describe what unexpected behavior you're seeing.`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: [`!laptop`],
    help: `gives some advice about what laptop to use for web development`,
    category: "Node.js",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "",
            type: EmbedType.Rich,
            description: `Web development is generally not a highly taxing process, so the laptop you get may matter less than you think. Any operating system is fine for general web development.

A few things to consider when getting a laptop:
- Memory may be important if you plan on running containers (common as part of typical development flows) or emulators for mobile devices. Look for a laptop with at least 16GB of memory.
- Consumer-targeted laptops tend to be less repairable and receive less support over long periods of time than business laptops.

Here are a few recommendations for laptops:
- Dell Latitude or XPS
- Lenovo Thinkpad
- Apple Macbook (avoid models with butterfly keyboards)

These lines are popular so there's generally a lot of resources for working on them; their makers have refurbished stores and they are also widely available used if you're on a budget.
`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: ["!remote", "!remotework"],
    help: "provides resources for the remote work job search",
    category: "Web",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "Acquiring a remote position",
            type: EmbedType.Rich,
            description: `
Below is a list of resources we commonly point to as an aid in a search for remote jobs.

NOTE: If you are looking for your first job in the field or are earlier in your career, then getting a remote job at this stage is incredibly rare. We recommend prioritizing getting a job local to the area you are in or possibly moving to an area for work if options are limited where you are.

If you are feeling confident or are further along in career, feel free to make use of the following resources to start your search:

https://hnhiring.com/
https://whoishiring.io/
https://weworkremotely.com/
https://remoteok.io/
https://remotive.io/remote-jobs/software-dev
            `,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: ["!junior", "!jobmarket"],
    help: "provides resources for the remote work job search",
    category: "Web",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "It's a rough market",
            type: EmbedType.Rich,
            description: `The job market right now sucks for folks just starting out, but it's never been easy for folks to get their first job. There are always ways in, but right now there are fewer and there's more competition. Layoffs mean that there are more experienced people job hunting than there have been in years.

The experienced members of the server don't have experience with navigating a market like this as a newer developer, which limits our ability to give help. If you find something that works for you, please share it! That information helps us give better answers to the next person who asks.

Remote work has the most competition, and thus is likely to be more difficult to land a role. We generally recommend going local, networking at meetups or conferences that you can find.`,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: ["!ui"],
    category: "Web",
    help: `A list of popular tools related to UI development`,
    handleMessage: (msg) => {
      //
      msg.channel.send({
        embeds: [
          {
            title: "UI Development Libraries & Tools (React)",
            type: EmbedType.Rich,
            description: `User interfaces can be a tricky thing to get right, luckily there are a lot of tools out there to help you out. Here are some of the popular ones:
_ _
_ _
`,
            fields: [
              {
                name: "Libraries",
                value: `
- [Radix UI](https://www.radix-ui.com/)
- [Mantine](https://mantine.dev/)
- [NextUI](https://nextui.org/)
- [Chakra UI](https://chakra-ui.com/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
`,
                inline: true,
              },
              {
                name: "_ _",
                value: `
- [Headless UI](https://headlessui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Material UI](https://mui.com/)
- [Ant Design](https://ant.design/)
- [Flowbite](https://flowbite.com/)
                `,
                inline: true,
              },
              {
                name: "Tools",
                value: `
- [Tailwind CSS](https://tailwindcss.com/)
- [UnoCSS](https://unocss.dev/)
- [Storybook](https://storybook.js.org/)
- [Sass](https://sass-lang.com/)
- [Styled-components](https://styled-components.com/)
- [Vanilla-extract](https://vanilla-extract.style/)
- [Panda CSS](https://panda-css.com/)
                `,
                inline: true,
              },
            ],
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: ["!apply"],
    help: "a quick list of 'good to know' items for job applications",
    category: "Web",
    handleMessage: (msg) => {
      msg.channel.send({
        embeds: [
          {
            title: "A quick list of 'good to know' items for job applications",
            type: EmbedType.Rich,
            description: dedent`
              - Your resume and interview performance are more important than your projects.
              - If you struggle to get interviews, polish your resume.
              - If you get invited to interviews reliably but constantly get rejected/ghosted afterward, practice interviewing.
              - Job descriptions are like a wishlist. It is common for a candidate to not tick every checkbox but still get the job. Just apply for the position regardless.
              - Junior remote jobs are very rare. For more, see \`!remote\`.
              - Depending on where you are, it is not uncommon for a junior to apply for 30+ jobs a week. See \`!junior\` for more details.
              - Working in large companies and smaller companies/start-ups has its advantages and disadvantages.
              - Freelancing and starting a start-up is very challenging compared to being an employee. It requires more than just your technical skills. e.g. acquiring customers, marketing, etc.
            `,
            color: EMBED_COLOR,
          },
        ],
      });
    },
  },
  {
    words: ["!auth", "!authentication"],
    help: "Provides a list of popular backend- and meta-frameworks",
    category: "Web",
    handleMessage: (msg) => {
      const firstMention = msg.mentions.users.first();
      const embed = {
        title: "",
        type: EmbedType.Rich,
        description: `
Authentication is a critical part of most web applications. Here are some resources to help you get started.
- [JSON Web Tokens (JWT) are Dangerous for User Sessions](https://redis.io/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions/)
- [JWT should not be your default for sessions](https://evertpot.com/jwt-is-a-bad-default/)
        `,
        fields: [
          {
            name: "Authentication Resources",
            value: `
- [TheCopenhagenBook](https://thecopenhagenbook.com/)
- [OWASP Auth Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Session Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
`,
            inline: true,
          },
          {
            name: "Authentication Libraries",
            value: `
- [Lucia](https://lucia-auth.com/)
- [Auth.js](https://authjs.dev/)
- [Passport](http://www.passportjs.org/)
`,
            inline: true,
          },
          {
            name: "Auth as a service",
            value: `
- [Supabase](https://supabase.io/)
- [Clerk](https://clerk.com/)
- [Auth0](https://auth0.com/)
`,
            inline: true,
          },
        ],
        color: EMBED_COLOR,
      };

      if (firstMention && firstMention.id !== msg.mentions.repliedUser?.id) {
        embed.description = `Hey ${firstMention}, ${embed.description}`;
      }

      msg.channel.send({
        embeds: [embed],
      });
    },
  },
];

const createCommandsMessage = () => {
  const groupedMessages: { [key in Categories]: Command[] } = {
    "Node.js": [],
    Communication: [],
    Web: [],
  };

  // Omit any commands that are internal, like the `@here` warning
  const visibleCommands = commandsList.filter((command) => !!command.help);

  visibleCommands.forEach((command) => {
    groupedMessages[command.category].push(command);
  });

  const categoryDescriptions = sortedCategories.map((category) => {
    const commands = groupedMessages[category];
    // Mutating in map(), but whatever
    commands.sort((a, b) => {
      // Assume there's at least one trigger word per command
      // Only check the first line of the message
      return a.words[0].split("\n", 1)[0].localeCompare(b.words[0]);
    });

    const boldTitle = `**${category}**`;
    const commandDescriptions = commands
      .map((command) => {
        const formattedWords = command.words.map((word) => `**\`${word}\`**`);
        return `${formattedWords.join(", ")}: ${command.help}`;
      })
      .join("\n");

    const categoryDescription = `${boldTitle}\n${commandDescriptions}`;
    return categoryDescription;
  });

  return categoryDescriptions.join("\n\n").trim();
};

const commands: ChannelHandlers = {
  handleMessage: async ({ msg: maybeMessage }) => {
    if (!maybeMessage.guild && maybeMessage.channel.type !== ChannelType.DM) {
      return;
    }
    const msg = maybeMessage.partial
      ? await maybeMessage.fetch()
      : maybeMessage;

    commandsList.forEach((command) => {
      const keyword = command.words.find((word) => {
        return msg.content.toLowerCase().includes(word);
      });

      if (keyword) {
        if (cooldown.hasCooldown(msg.author.id, `commands.${keyword}`)) return;
        cooldown.addCooldown(
          msg.author.id,
          `commands.${keyword}`,
          command.cooldown,
        );
        command.handleMessage(msg);
      }
    });
  },
};

export default commands;
