import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addAnswer, submitPrompt } from "../chatSlice";
import styles from "./ChatWidget.module.css";
type InputEvent = React.ChangeEvent<HTMLTextAreaElement>;

function ChatWidget() {
  const [prompt, setPrompt] = useState("");
  const { chat, loading } = useAppSelector((state) => state.chat);
  const messagesRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();

  const onPromptChange = (e: InputEvent) => {
    setPrompt(e.target.value);
  };

  const onSubmit = () => {
    //   Workaround to handle onKeyDown enter
    console.log("On Submit");
    setTimeout(() => {
      if (prompt.trim() && !loading) {
        setPrompt("");
        dispatch(submitPrompt(prompt));
      }
    });
  };

  useEffect(() => {
    messagesRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className={styles.chatWidget}>
      <div className={styles.widgetHeader}>
        <div className={styles.widgetHeaderMenu}>
          <img src="/Hamburger_icon.svg" alt="menu" />
          <span>Ivy Bot</span>
        </div>
        <img
          className={styles.widgetCloseIcon}
          src="/Cross_icon.svg"
          alt="close"
        />
      </div>
      <div className={styles.widgetContent}>
        <div className={styles.messagesContainer}>
          {chat.map((item) => (
            <div
              key={item.createdAt}
              className={
                item.type === "question"
                  ? styles.questionContainer
                  : styles.answerContainer
              }
            >
              {item.type === "answer" ? (
                <img
                  className={styles.avatarImage}
                  src={"/avatar.png"}
                  alt="avatar"
                />
              ) : null}
              <p>{item.text}</p>
            </div>
          ))}
          <div ref={messagesRef} />
        </div>
        <div className={styles.widgetInputContainer}>
          <textarea
            placeholder="enter your message"
            value={prompt}
            onChange={onPromptChange}
            onKeyDown={(e) => (e.key === "Enter" ? onSubmit() : null)}
          />
          <div className={styles.widgetActions}>
            <img src="/translation_icon.png" alt="translation" />
            <button onClick={onSubmit} disabled={loading || !prompt}>
              <img src="/send-message.png" alt="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWidget;
