// © 2017 Allie Reilly
console.log("Opening Heart Rate Alert Clock Settings page");

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Elegant Clock</Text>}>
        
        <Text bold align="center">Select Colour Theme</Text>
        <ColorSelect
          label={`color`}
          settingsKey="color"
            colors={[
              {color: 'gold'},
              {color: 'silver'},
           ]}
          />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);