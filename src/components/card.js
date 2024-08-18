import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardPage = ({ image, title, description, id }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link key={id} href={`/product/csr/${id}`}>
        <Image src={image} width={500} height={500} alt={description} />
      </Link>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div>
          <button className="bg-purple-500 rounded px-6 py-1 text-white font-semibold hover:bg-purple-300 hover:text-red-400">
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
