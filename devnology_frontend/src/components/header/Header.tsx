import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md py-4 px-8 flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-xl font-semibold">Devnology E-Commerce</h1>
      </Link>
      <nav className="space-x-4">
        <Link href="/cart" className="text-blue-400 hover:underline">
          Carrinho
        </Link>
        <Link href="/orders" className="text-blue-400 hover:underline">
          Pedidos
        </Link>
      </nav>
    </header>
  );
};

export { Header };
