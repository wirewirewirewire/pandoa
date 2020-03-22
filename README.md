# Pandoa WirVsVirus

[WirVsVirus ID: 0348 0008](thttps://airtable.com/shrs71ccUVKyvLlUA/tbl6Br4W3IyPGk1jt/viw7AlEju6qFtXJqL?blocks=hide)

![Infection chain tracker](https://raw.githubusercontent.com/wirewirewirewire/pandoa/master/assets/images/infection-chain-tracker.png)

[DevPost](https://devpost.com/software/08_pandoa-corona-virus-tracker)

[Slack](https://wirvsvirus.slack.com/archives/C01064DMNLR)

# How can I contribute?

Would be great if you could help!

- **Backend** (currently we use node.js with mongodb) [Daniel Böber](https://github.com/smarthomeagentur), [KaiHawaii](https://github.com/Kaipirinha), [Tim](https://github.com/pr1zm)
- **Frontend** (react native (expo)) [Robert Gühne](https://github.com/Utzel-Butzel), [KaiHawaii](https://github.com/Kaipirinha)
- **Testing** (giving feedback on bugs, testing in real life environments) Valentin - Medizin, Machine Learning Modelle, Epidemiologie
- **Evaluation** (machine learning and data analytics) [Sören](https://github.com/soerili)
- **Communications & organisation** Chris Walter, [Hans - rooom.com](https://github.com/Hans-rooom) 
- **Media** (creating communication material, presentations, videos, etc.) Soprathna
- **CI/CD, Devops** (currently we use AWS EC2 and cloudfront)

Project Plan (Todos): [Trello Board](https://trello.com/b/LlLyGAF3/pandoa)

### Corona Tracker

The app informs you, if you had contact with an infected patient.

#### Die App informiert dich, wenn du Kontakt mit einem infizierten Patient hattest.

Dafür wird im Hintergrund die Bewegung des Nutzers aufgezeichnet und mit den Bewegungsdaten von Patienten verglichen.
Der Abgleich funktioniert, ohne dass dein Bewegungsprofil geteilt werden muss, nur im Falle einer Infektion hast du die Möglichkeit dieses anderen Nutzern bereitzustellen.

### Data security

No tracking data will be shared unless you want to share the because you've got infected.

### How it works

- The app tracks your phones movement and saves it on the device (no login or upload).
- The app downloads anonymous position data of infected patients (from the area you have been) and compares them with your movements.
- This can cause an alarm like: `You've attended Event XYZ! A person that is now infected with COVID-19 was at the same place and you had contact for 30 min`

If you got infected you can anonymously share your positions of the last 1-2 weeks.

### The tech behind

![Infection chain tracker](https://raw.githubusercontent.com/wirewirewirewire/pandoa/master/assets/images/how-it-works.png)

- **Blue lines** This is your own movement
- **Small black dots** These are the positions of infected patients
- **Red lines** This is when you have been in contact with an infected person (at the same position and the same time)

### How to use

The application uses [Expo.io](https://expo.io/) for development. Make sure you have Expo and Android Studio or Xcode installed.

[How to use the emulator](https://docs.expo.io/versions/latest/workflow/android-studio-emulator/)

```
// Install the expo cli
npm install -g expo-cli
npm install
npm start
```

### How to publish

```
npm expo build:ios
npm expo upload:ios
```

```
npm expo build:android -t apk
```

### Backend

The backend is node.js (express) with a mondoDB (mongoose).
https://github.com/wirewirewirewire/pandoa-backend

### Roadmap

Webapp

### License

The whole application is **open source**. Do whatever you want with it :)

[GNU/GPLv3](https://github.com/wirewirewirewire/pandoa/blob/master/LICENSE)

### Similar solutions from the hackathlon

https://github.com/beat-virus/corona_tracker
https://github.com/mk0/infectionchain_tracking
https://bs-sd.de/corona/
https://github.com/rehfeldchris/cmpe272
https://play.google.com/store/apps/details?id=cat.gencat.mobi.StopCovid19Cat
https://play.google.com/store/apps/details?id=sg.gov.tech.bluetrace

### Credits

Illustrations
https://www.vecteezy.com/vector-art/149356-bacterias-and-mold-vector-drawings-doodle
