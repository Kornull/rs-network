# Connections project with real backend

### Please use a fake e-mail!

## [Deploy](https://kornull-rs-network.netlify.app/)


This project is intended for individual performance using the real one-for-all server. You can check
out your colleagues with their progress and be faster and more productive, because everyone should
have the same functionality.

## Stack
- Angular 17
- RxJs
- NgRx
- ESLint
- Prettier
- SCSS
- Angular Material

## General point

Single server provides sharing data and all students can interact with it reading and writing other
data. Each student's frontend project must be **identical in functionality** and any student opening
another student's project should have the same capabilities.

## Limitations

- all users are located in different timezones. Server keeps date and time
  in [UNIX timestamp](https://www.unixtimestamp.com/) format (as number), but you have care about
  appropriate timezone for everyone.
- server does not contain sufficient protection, for learning purpose we cut cumbersome redundant
  processes in order to focus on crucial features. Do not try to break it but inform us if you find
  critical defects.
- all transmitted data is **public** including personal email and messages. Do not use any sensitive
  data.
- server may have restrictions or limitations in data response if DB contains a lot of records. We
  are sincerely asking you to use it only to make sure the application works but do not overuse it
  for fun.

---

## Milestones

Application represents the platform to allow users to communicate via public text messages. Before
starting to use the service a guest must register and sign in, after that all http-requests have to
contain `rs-email`, `rs-uid` and `Authorization` headers.

Authorized user can see vertically divided main page, where left side is a list of public group and
right side is a list of people including personal conversations. Each user can create own public
group and broadcast messages there or use existing group along with other participants.

Personal information can be viewed on a special profile page, where it can be immediately edited.

Detailed information about each part of the application is presented in the sections:

1. [Registration](./milestone_1.registration.md)
2. [Login](./milestone_2.login.md) 
3. [Profile](./milestone_3.profile.md) 
4. [Update profile](./milestone_4.profile_update.md) 
5. [Logout](./milestone_5.logout.md) 
6. [People and group sections](./milestone_6.people_groups.md) 
7. [Group dialog](./milestone_7.group_dialog.md) 
8. [People conversation](./milestone_8.conversation.md) 
9. [404 page](./milestone_9.404_page.md) 
10. Bonus: [Style theme](./milestone_10.theme.md) 

#### Final conclusion

## Url navigation

#### Guest

Pages available only for users before authorization. That pages are not available for users after
successful authorization and protected by _Guards_.

_`/signup` (registration)_  
Page to create new account.

_`/signin` (login)_  
Page where user can enter email and password to enter the platform. **Default page** for
non-authorized users.

#### Member

That pages allowed only for authorized users. Should be protected by _Guards_.

_`/` (main page)_  
Page with group list and people list.**Default page** for authorized users.

_`/profile` (user profile)_  
User's information with the ability to edit it.

_`/group/{:groupID}` (broadcast page)_  
where, `:groupID` is unique group identifier;  
Page where user can send message to all participants.

_`/conversation/{:conversationID}` (person dialog)_  
where, `:conversationID` is unique room identifier with interlocutor;
Page where user can write personal messages directly.
