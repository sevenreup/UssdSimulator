import { useEffect, useRef, useState } from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";

const keyboardSettings = {
  mergeDisplay: true,
  layout: {
    default: [
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "{shift} z x c v b n m {backspace}",
      "{numbers} {space} {ent}",
    ],
    shift: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "{shift} Z X C V B N M {backspace}",
      "{numbers} {space} {ent}",
    ],
    numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"],
  },
  display: {
    "{numbers}": "123",
    "{ent}": "return",
    "{escape}": "esc ⎋",
    "{tab}": "tab ⇥",
    "{backspace}": "⌫",
    "{capslock}": "caps lock ⇪",
    "{shift}": "⇧",
    "{controlleft}": "ctrl ⌃",
    "{controlright}": "ctrl ⌃",
    "{altleft}": "alt ⌥",
    "{altright}": "alt ⌥",
    "{metaleft}": "cmd ⌘",
    "{metaright}": "cmd ⌘",
    "{abc}": "ABC",
  },
};

export interface IPhoneKeyboardProps {
  onTextChange: (text: string) => void;
  inputText: string;
}

export default function PhoneKeyboard({
  onTextChange,
  inputText,
}: IPhoneKeyboardProps) {
  const [layoutName, setLayoutName] = useState("numbers");
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);
  useEffect(() => {
    if (keyboardRef) {
      keyboardRef.current?.setInput(inputText);
    }
  }, [inputText, keyboardRef]);

  const onChange = (input: string, e?: MouseEvent) => {
    onTextChange(input);
  };
  const onKeyPress = (button: any) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
    if (button === "{numbers}" || button === "{abc}") handleNumbers();
  };

  const handleShift = () => {
    console.log("Handle shift");
    setLayoutName(layoutName === "default" ? "shift" : "default");
  };

  const handleNumbers = () => {
    console.log("Handle numbers");
    setLayoutName(layoutName === "numbers" ? "default" : "numbers");
  };

  return (
    <Keyboard
      keyboardRef={(r) => {
        keyboardRef.current = r;
      }}
      {...keyboardSettings}
      onChange={onChange}
      onKeyPress={onKeyPress}
      layoutName={layoutName}
    />
  );
}
