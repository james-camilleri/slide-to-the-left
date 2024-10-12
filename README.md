# SvelteKit Slides

**(for want of a better name)**

A quick-start template for creating slide decks with SvelteKit & PartyKit.

# What is this?

Do you occasionally have to give presentations? Do you hate PowerPoint? Do you love JavaScript/TypeScript and Svelte? Have you ever accidentally been drawn into a massive time black hole trying to code your own presentation? Well I have, and this is the result. It's not a library, it's not an everything-and-the-kitchen-sink solution to every slide deck scenario under the sun, but it is a relatively functional starter template for writing your own slide decks with Svelte.

It includes the obvious feature of making an in-browser slideshow, as well as some nifty bits like:

- presenter view
- a slide remote/clicker you can use from your smartphone
- a "follow" mode where audiences can watch a synchronised slideshow on their devices
- websocket integration with [PartyKit](https://www.partykit.io/) so you can build things like interactive polls and such, if you're so inclined

# How do I start?

Just clone the repo, or use [`degit`](https://github.com/Rich-Harris/degit) to copy the latest version of the template to your machine:

```bash
npx degit james-camilleri/slides my-magnificent-presentation
```

Once you've cloned the template, set up add a [PartyKit account](https://docs.partykit.io/reference/partykit-cli/) so the syncing functionality will work and add your PartyKit app url to the `PUBLIC_PARTYKIT_HOST` env variable in your `.env` file:

```
PUBLIC_PARTYKIT_HOST=https://APP.USER.partykit.dev
```
