Example project showcases aws skills

Will need some setup in the Amazon Developer Console to work:

Will need to create a skill to play sounds, link it to the program, and then perform the following steps: 

Go to your skill in the Alexa Developer Console.
Under "Interaction Model" > "Intents," add a new custom intent named PlaySoundIntent.
Add sample utterances like:
play {SoundName}
start {SoundName}
i want to listen to {SoundName}
Define an Intent Slot named SoundName. Use a built-in slot type like AMAZON.MusicRecording or AMAZON.Genre, or create a custom slot type if you have a specific list of sounds (e.g., "news", "radio one", "podcast xyz"). For simplicity now, AMAZON.SearchQuery can work as a free-form slot, though less specific.
Make the SoundName slot required and configure Alexa to prompt for it if the user doesn't provide it (e.g., "What sound would you like me to play?").
Save and Build the interaction model.
