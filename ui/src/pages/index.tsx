import Image from "next/image";
import { lexend } from "@/fonts";
import { useRouter } from "next/router";
import Layout from "@/components/nav-wrapper";
import { useState, useEffect } from "react";
import Character from "@/types/character";
import axios from "axios";
import Modal from "@/components/modal";
import { NextPageContext } from "next";

export async function getServerSideProps(ctx: NextPageContext) {
  // Fetch data from external API
  ctx.res!.setHeader("Cache-Control", "no-store");

  var url = `${process.env.NEXT_PUBLIC_API_URL}/api/character/all`;

  const res = await axios.get(url);

  const data = await res.data;

  return { props: { characters: data } };
}

const Home = (props: any) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { characters } = props;
  const noCharacters = 8;
  const [modalState, setModalState] = useState(false);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(characters.length / noCharacters)
  );

  let [appCharacters, setCharacters] = useState(characters);

  let [displayedCharacters, changeDisplayedCharacters] = useState([]);

  useEffect(() => {
    changeDisplayedCharacters(
      appCharacters.slice((page - 1) * noCharacters, page * noCharacters)
    );
  }, [page]);

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const previousPage = () => {
    let previousPage = page - 1;
    if (previousPage >= 1) {
      setPage(previousPage);
    }
  };

  const handleClick = (id: number) => {
    router.push(`/character/${id}`);
  };

  return (
    <Layout>
      <main
        className={`flex flex-col max-h-screen scroll-smooth overflow-y-scroll snap-y snap-mandatory ${lexend.className} `}
      >
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          characters={appCharacters}
          setCharacters={setCharacters}
          page={page}
          noCharacters={noCharacters}
          setTotalPages={setTotalPages}
        />
        <div className="snap-start relative h-screen w-screen ">
          <div className="relative h-screen w-screen aspect-video "></div>
          <Image
            fill={true}
            className="object-center object-cover pointer-events-none"
            src={"/images/bg-1.png"}
            alt={""}
          />
          <div className="absolute left-8 top-8 flex space-x-4 items-center">
            <div className="">
              <Image
                src={`/images/star-wars-logo.png`}
                alt={""}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="object-contain"
              />
            </div>

            <div className={`font-semibold text-xl`}>
              <p>Database</p>
            </div>
          </div>
        </div>

        <div className="snap-start relative">
          <div className="relative w-screen h-screen aspect-video z-0">
            <Image
              fill={true}
              className="object-center object-cover pointer-events-none"
              src={"/images/bg-2.png"}
              alt={""}
            />
            <div className="text-white h-24 relative px-32 flex justify-end items-center">
              <div className="space-x-4">
                <button onClick={() => setModalState(true)}>
                  Add Character
                </button>
              </div>
            </div>
            <div
              className="grid gap-8 grid-cols-4 py-9 px-32"
              style={{ height: `calc(100vh - 12rem)` }}
            >
              {displayedCharacters.map((el: Character) => (
                <div
                  key={el.name}
                  className={`relative rounded-xl hover:scale-105 transition ease-in-out duration-300 cursor-pointer`}
                  onClick={() => handleClick(el.id)}
                >
                  <Image
                    fill={true}
                    src={`${el.image}`}
                    alt={""}
                    className="object-cover drop-shadow-2xl"
                  />

                  <div className={`absolute bottom-2 left-2 font-extralight`}>
                    <p className="mix-blend-difference">{el["name"]}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-white h-24 relative px-32 flex justify-end items-center">
              <div className="space-x-4">
                <button
                  onClick={previousPage}
                  className={page == 1 ? "text-gray-400" : ""}
                  disabled={page === 1 ? true : false}
                >
                  Previous Page
                </button>
                <button
                  onClick={nextPage}
                  className={page == totalPages ? "text-gray-400" : ""}
                  disabled={page === totalPages ? true : false}
                >
                  Next Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
