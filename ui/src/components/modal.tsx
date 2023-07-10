import { useRef, useEffect, RefObject } from "react";
import axios from "axios";
import getConfig from "next/config";

const Modal = (props: any) => {
  const { publicRuntimeConfig } = getConfig();

  const modalWrapper = useRef<HTMLDivElement>(null);

  const characterName = useRef<HTMLInputElement>(null);

  const characterImage = useRef<HTMLInputElement>(null);

  const characterStanceImage = useRef<HTMLInputElement>(null);

  let characterImageBase64: any, characterStanceImageBase64: any;

  const convertImage = (
    fileInputRef: RefObject<HTMLInputElement>,
    collector: any
  ) => {
    let file = fileInputRef!.current!.files![0];
    var reader = new FileReader();

    reader.onload = () => {
      let base64String = reader!.result!;

      base64String = base64String.toString().split(",")[1];

      if (collector == "image") {
        characterImageBase64 = base64String;
      } else {
        characterStanceImageBase64 = base64String;
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (props.modalState) {
      document.getElementById("modal-wrapper")?.classList.remove("hidden");
    } else {
      document.getElementById("modal-wrapper")?.classList.add("hidden");
    }
  }, [props.modalState]);

  const showModal = (val: boolean) => {
    props.setModalState(val);
  };

  const submit = async () => {
    const body = {
      name: characterName.current?.value,
      image: characterImageBase64,
      stanceImage: characterStanceImageBase64,
    };

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/character/create`;

    console.log(url);

    const res = await axios.post(url, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (res.status == 200) {
      props.setCharacters([...props.characters, res.data]);

      props.setTotalPages(Math.ceil((props.characters.length + 1) / 8));

      // Modal Success

      characterName.current!.value = "";
      characterImage.current!.value = "";
      characterStanceImage.current!.value = "";

      showModal(false);
    } else {
      // Modal Error
    }
  };

  return (
    <div
      id="modal-wrapper"
      ref={modalWrapper}
      className={`relative z-10 transition-all hidden`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Add Character
                  </h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>

                      <div className="relative mt-1 rounded-md shadow-sm ">
                        <input
                          type="text"
                          ref={characterName}
                          name="characterName"
                          id="characterName"
                          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Eren Yeager"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Image</p>

                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          type="file"
                          ref={characterImage}
                          name="characterImage"
                          id="characterImage"
                          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0.00"
                          onChange={() => convertImage(characterImage, "image")}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Stance Image</p>

                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          ref={characterStanceImage}
                          type="file"
                          name="characterStanceImage"
                          id="characterStanceImage"
                          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={() =>
                            convertImage(characterStanceImage, "stanceImage")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-stone-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 sm:ml-3 sm:w-auto"
                onClick={async () => await submit()}
              >
                Submit
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => showModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
