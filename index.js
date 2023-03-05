const BUTTON_RELEASE = 0b10000000,
  BUTTON_FOCUS = 0b01000000,
  BUTTON_TELE = 0b00100000,
  BUTTON_WIDE = 0b00010000,
  MODE_IMMEDIATE = 0b00001100,
  MODE_DELAY = 0b00000100,
  MODE_MOVIE = 0b00001000;

const UUID_SERVICE = '00050000-0000-1000-0000-d8492fffa821',
  UUID_PAIR = '00050002-0000-1000-0000-d8492fffa821',
  UUID_SHOOT = '00050003-0000-1000-0000-d8492fffa821';

function encodeRemoteName(name) {
  let result = new Uint8Array(name.length + 1);
  result[0] = name.length;
  for (let i = 0; i < name.length; i++) {
    result[i + 1] = name.charCodeAt(i);
  }
  return result;
}

const remoteName = encodeRemoteName('Web');

function timeout(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

/** @type {BluetoothDevice} */
let device;

/** @type {BluetoothRemoteGATTCharacteristic} */
let shootCharacteristic;

function onConnectionChange() {
  let isConnected = !!device;
  connectGroup.classList.toggle('hidden', isConnected);
  shootGroup.classList.toggle('hidden', !isConnected);
}

addEventListener('beforeunload', () => {
  if (device) {
    device.gatt.disconnect();
  }
});

connectBtn.onclick = async () => {
  connectBtn.disabled = true;
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [
        {
          services: [UUID_SERVICE]
        }
      ]
    });
    await device.gatt.connect();
    await timeout(1);
    device.addEventListener(
      'gattserverdisconnected',
      () => {
        device = undefined;
        onConnectionChange();
      },
      {
        once: true
      }
    );
    let service = await device.gatt.getPrimaryService(UUID_SERVICE);
    let pairCharacteristic = await service.getCharacteristic(UUID_PAIR);
    await pairCharacteristic.writeValue(remoteName);
    shootCharacteristic = await service.getCharacteristic(UUID_SHOOT);
    onConnectionChange();
  } catch (e) {
    alert(e);
    device = undefined;
  } finally {
    connectBtn.disabled = false;
  }
};

async function pressBtn() {
  console.log('Pressing release button');
  await shootCharacteristic.writeValue(
    Uint8Array.of(BUTTON_RELEASE | MODE_IMMEDIATE)
  );
  console.log('Releasing release button');
  await shootCharacteristic.writeValue(Uint8Array.of(MODE_IMMEDIATE));
}

shootBtn.onclick = async () => {
  shootBtn.disabled = true;
  progressBar.style.visibility = 'visible';

  try {
    let number = numberInput.valueAsNumber;
    let exposure = exposureInput.valueAsNumber;
    let delay = delayInput.valueAsNumber;
    let totalTime = exposure * number + delay * (number - 1);
    progressBar.value = 0;
    progressBar.max = totalTime;

    for (let i = 1; i <= number; i++) {
      if (i !== 1) {
        shootBtn.textContent = `Waiting after shot #${i}/${number}`;
        await timeout(delay);
        progressBar.value += delay;
      }
      shootBtn.textContent = `Shooting #${i}/${number}`;
      console.group(`Shot ${i}`);
      await pressBtn();
      await timeout(exposure);
      await pressBtn();
      progressBar.value += exposure;
      console.groupEnd(`Shot ${i}`);
    }
  } catch (e) {
    alert(e);
  } finally {
    shootBtn.textContent = 'Start';
    shootBtn.disabled = false;
  }
};

if (!navigator.bluetooth) {
  document.body.textContent =
    'Web Bluetooth is not supported in this browser. Please use latest Chromium-based browser.';
}
