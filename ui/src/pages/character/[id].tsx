import Image from "next/image";
import { lexend } from "@/fonts";
import ArrowLeft from "@/components/arrow-left";
import Layout from "@/components/nav-wrapper";
import { NextPageContext } from "next";
import axios from "axios";
import CharacterDetail from "@/types/characterDetail";
import { randomUUID } from "crypto";

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;
  var url = `${process.env.NEXT_PUBLIC_API_URL}/api/character/details/${id}`;
  const res = await axios.get(url);
  const data = await res.data;

  return { props: { detail: data } };
}

const Detail = (props: any) => {
  const { detail } = props;

  const characterDetail = new CharacterDetail(detail);

  return (
    <Layout>
      <main className={`max-h-screen ${lexend.className}`}>
        <div className="h-screen relative flex flex-row-reverse relative">
          <Image
            fill={true}
            className="object-center object-cover pointer-events-none"
            src={`/images/bg-3.jpg`}
            alt={""}
          />
          <div className="absolute left-0 top-0 p-12">
            <ArrowLeft />
          </div>
          <div className="absolute left-0 bottom-0 uppercase text-6xl p-12 font-semibold space-y-2">
            <p>{characterDetail.firstName}</p>
            <p className="space-x-4">
              <span>{characterDetail.lastName}</span>
              <span className="text-sm">{characterDetail.birthYear}</span>
            </p>
          </div>
          <div
            className={`bg-zinc-900 w-1/2 h-[90%] fixed bottom-0 rounded-tl-xl`}
          >
            <div className="relative h-full">
              <div className="absolute h-full w-full -left-1/2 scale-110 bottom-6">
                <Image
                  fill={true}
                  src={`${detail["stanceUrl"]}`}
                  alt={""}
                  className="object-contain"
                />
              </div>
              <div className="absolute h-full w-full right-0 font-normal p-16 space-y-8">
                <div className="flex  space-x-4 text-right justify-end ">
                  <div>
                    <p className="text-sm text-gray-500">Height:</p>
                    <p className="text-lg">{characterDetail.height}cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mass:</p>
                    <p className="text-lg">{characterDetail.mass}kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hair:</p>
                    <p className="text-lg">{characterDetail.hair}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Skin:</p>
                    <p className="text-lg">{characterDetail.skin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Eye:</p>
                    <p className="text-lg">{characterDetail.eye}</p>
                  </div>
                </div>
                <div className="flex  space-x-4 text-right justify-end ">
                  <div>
                    <p className="text-sm text-gray-500">Gender:</p>
                    <p className="text-lg">{characterDetail.gender}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Homeworld:</p>
                    <p className="text-lg">{characterDetail.homeWorld}</p>
                  </div>
                </div>
                <div className="flex  space-x-4 text-right justify-end ">
                  <div>
                    <p className="text-sm text-gray-500">Movies:</p>
                    {characterDetail.movies.map((el) => (
                      <p className="text-lg" key={el}>
                        {el}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex  space-x-4 text-right justify-end ">
                  <div>
                    <p className="text-sm text-gray-500">Starships:</p>
                    {characterDetail.starships.map((el) => (
                      <p className="text-lg" key={el}>
                        {el}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Detail;
