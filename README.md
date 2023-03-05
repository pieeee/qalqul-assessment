# Qalqul React Assesment By Ahnaf


[![Test](https://github.com/pieeee/qalqul-assessment/actions/workflows/test.yml/badge.svg)](https://github.com/pieeee/qalqul-assessment/actions/workflows/test.yml)[![Build](https://github.com/pieeee/qalqul-assessment/actions/workflows/build.yml/badge.svg)](https://github.com/pieeee/qalqul-assessment/actions/workflows/build.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

This project is powered by Next.Js, Typescript, SCSS, Redux and Jest.

## Whats Inside
- Home Page: Qalqul Articles now has a home page that showcases all the articles available on the website. You can browse through the articles and choose the ones that interest you.

- Search: I have added a search input box on the home page that allows you to search for articles by tags, categories, and titles. This will help you quickly find the articles you are looking for.

- Reactions: Articles now have three reactions - like, dislike, and comment. You can express your reaction to an article by clicking on the appropriate button.

- Comments: You can now comment on individual articles. This feature enables you to share your thoughts and opinions about the articles you have read and engage with other users.

- Individual Article Pages: Every article now has its own page that can be accessed by clicking on the article's title. This feature has been powered with Next.js serversideprops and getServerside paths.

- Profile Page: You can create and edit your profile on the profile page. This feature allows you to personalize your experience on Qalqul Articles and connect with other users.


## How to Use

Quickly get started!

In your terminal, run the following command:

```bash
yarn install
```

```bash
yarn dev
```

## Run Jest Tests

```bash
npm test
```

## Some Insights
- Typescript
- Conventional Commiting
- Used redux for overall store management
- SCSS theming
- Responsive
- Powered by Next.JS static generations on home page and articles pages
- Unit and integration testing

## Test Coverage

File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------|---------|----------|---------|---------|-------------------
All files                     |   88.41 |       76 |   85.57 |   89.16 |                   
 components/layout            |     100 |      100 |     100 |     100 |                   
  AuthenticatedMenu.tsx       |     100 |      100 |     100 |     100 |                   
  Header.tsx                  |     100 |      100 |     100 |     100 |                   
  index.tsx                   |     100 |      100 |     100 |     100 |                   
 components/pages/Article     |   97.05 |       50 |     100 |   96.87 |                   
  Comments.tsx                |      95 |       50 |     100 |   94.73 | 32                
  index.tsx                   |     100 |      100 |     100 |     100 |                   
 components/pages/Home        |     100 |      100 |     100 |     100 |                   
  index.tsx                   |     100 |      100 |     100 |     100 |                   
 components/pages/Profile     |   84.61 |       60 |   66.66 |    87.5 |                   
  index.tsx                   |   84.61 |       60 |   66.66 |    87.5 | 15-20             
 components/reusable          |     100 |      100 |     100 |     100 |                   
  RegistrationModal.tsx       |     100 |      100 |     100 |     100 |                   
  UserForm.tsx                |     100 |      100 |     100 |     100 |                   
 components/reusable/Articles |   94.44 |    88.88 |   91.66 |   93.93 |                   
  ArticleCard.tsx             |     100 |      100 |     100 |     100 |                   
  ArticleReactions.tsx        |      92 |     87.5 |   85.71 |    91.3 | 45-46             
 lib/store                    |   80.55 |      100 |   72.72 |      80 |                   
  browser-storage.ts          |      50 |      100 |      50 |   45.45 | 6-15              
  hooks.ts                    |     100 |      100 |     100 |     100 |                   
  index.ts                    |      90 |      100 |      50 |     100 |                   
  test-utils.tsx              |     100 |      100 |     100 |     100 |                   
 lib/store/slices             |   77.14 |    65.21 |   76.92 |   77.38 |                   
  article.slice.ts            |   71.79 |    65.21 |      72 |   71.64 | 66,84-103,161-182 
  registrationModal.slice.ts  |   91.66 |      100 |   83.33 |     100 |                   
  user.slice.ts               |   93.33 |      100 |    87.5 |     100 |                   
 lib/utils                    |     100 |      100 |     100 |     100 |                   
  articles.ts                 |     100 |      100 |     100 |     100 |                   




**Feel free to provide your valuable feedback!**
**Contact: sheikhahnafhasan@gmail.com**