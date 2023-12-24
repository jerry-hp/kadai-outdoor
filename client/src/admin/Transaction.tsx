// Import React dan Tailwind CSS
import { MdDelete } from "react-icons/md";
import Sidebar from "./components/sidebar";
import useTransaction from "./hooks/useTransaction";
import { FaEdit } from "react-icons/fa";

const TransactionTable = () => {
  const { transaction } = useTransaction(); 

  return (
    <div className="flex min-h-[100vh] ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 box-border">
          <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl text-[#0B2545] font-semibold mb-4">Transaction</h1>
            <table className="w-full table-auto bg-gray-200 text-left dark:bg-meta-4">
              <thead>
                <tr className="bg-gray-300 text-[#0B2545] dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium xl:pl-11">ID Transaksi</th>
                  <th className="py-4 px-4 font-medium">Total Harga</th>
                  <th className="py-4 px-4 font-medium">Tanggal Transaksi</th>
                  <th className="py-4 px-4 font-medium">Status</th>
                  <th className="py-4 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transaction?.map((transaction: any, index: number) => (
                  <tr key={index} className="text-[#0B2545]">
                    <td className="border-b border-[#eee] py-5 px-4 xl:pl-11">
                      <p className="text-sm">{transaction.id}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="">{transaction.amount}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-sm">{transaction.created_at}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-sm">{transaction.status}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <div className="flex items-center space-x-3.5">
                        <button onClick={() => alert("BELUM")} className="hover:text-primary">
                          <FaEdit />
                        </button>
                        <button onClick={() => alert("BELUM")} className="hover:text-primary">
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TransactionTable;
