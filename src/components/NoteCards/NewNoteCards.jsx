import { useState } from "react";
import { toast } from "sonner";
import { CardLayout } from "@/components";

export const NewNoteCards = ({ onNoteCreated }) => {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  function handleStartEditor() {
    setShouldShowOnBoarding(false);
  }

  function handleContentchanged(event) {
    setContent(event.target.value);
    if (event.target.value == "") {
      setShouldShowOnBoarding(true);
    }
  }

  function hanleSaveNote(event) {
    event.preventDefault();
    if (content === "") {
      return;
    }

    onNoteCreated(content);
    toast.success("Nota criada com sucesso");
    setContent("");
    setShouldShowOnBoarding(true);
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvaliable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    if (!isSpeechRecognitionAPIAvaliable) {
      alert("Seu navegador não duporta essa função");
      return;
    }

    setIsRecording(true);
    setShouldShowOnBoarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");
      setContent(transcription);
    };
    speechRecognition.onerror = (event) => {
      console.error(event);
    };
    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);
  }

  return (
    <CardLayout
      triggerStyle={"rounded-lg inline-block m-1 max-md:px-2 p-3 relative bg-white border-4 border-zinc-900 text-zinc-900 shadow-[8px_8px_0px_rgba(0,0,0,0.75)]"} trigger={
        <>
          <span className="font-semibold text-zinc-900">Adicionar nota</span>
          <p className="text-sm font-semibold leading-6 text-zinc-500 ">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
        </>
      }
      content={
        <form className="flex-1 flex flex-col" action="">
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-200">
              Adicionar nota
            </span>

            {shouldShowOnBoarding ? (
              <p className="text-sm leading-6 text-slate-400">
                Comece{" "}
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="font-semibold text-sky-600 hover:underline"
                >
                  gravando uma nota em áudio
                </button>{" "}
                ou se preferir{" "}
                <button
                  type="button"
                  onClick={handleStartEditor}
                  className="font-semibold text-sky-600 hover:underline"
                >
                  utilize apenas texto
                </button>{" "}
                automaticamente.
              </p>
            ) : (
              <textarea
                autoFocus
                className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                onChange={handleContentchanged}
                value={content}
              />
            )}
          </div>

          {isRecording ? (
            <button
              type="button"
              onClick={handleStopRecording}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-slate-300 outline-none font-medium hover:text-slate-100"
            >
              <div className="size-3 rounded-full bg-red-500 animate-pulse" />
              Gravando... (clique para parar)
            </button>
          ) : (
            <button
              type="button"
              onClick={hanleSaveNote}
              className="w-full bg-lime-400 py-4 text-center text-zinc-900 outline-none font-semibold hover:bg-lime-500"
            >
              Salvar nota?
            </button>
          )}
        </form>
      } />
  );
};
