import React, { useCallback, useEffect, useState } from "react";
import Paginations from "../../components/pagination/Paginations";
import { EditIcon, Funnel, Plus, Search, SearchIcon } from "lucide-react";
import SearchInput from "../../components/muiComponent/SearchInput";
import { delay } from "../../utils/common";
import { AdminUserList } from "../../services/userService";
import { toast } from "react-toastify";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalCreateUser from "../../components/userAdmin/ModalCreateUser";
import ModalUpdateUser from "../../components/userAdmin/ModalUpdateUser";

function UserAdmin() {
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState({ type: null, data: null });
  const { setLoading } = useOutletContext();

  // --- SEARCH PARAMS ---
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchName, setSearchName] = useState(searchParams.get("name") || "");
  const urlPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(urlPage);

  // ---- GET USER ---
  const getUser = useCallback(
    async (filters = {}) => {
      try {
        setLoading(true);
        await delay(800);

        const result = await AdminUserList(filters, token);
        setUsers(result.data);
        setCurrentPage(result.page);
        setTotalPages(result.totalPages || 1);
      } catch {
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, token]
  );

  useEffect(() => {
    const filters = {};

    const name = searchParams.get("name");
    if (name) filters.name = name;

    const page = Number(searchParams.get("page")) || 1;

    getUser({ ...filters, page });
    setCurrentPage(page);
  }, [getUser, searchParams]);

  // --- HANDLER SEARCH ---
  const handleSearch = () => {
    const params = {};
    if (searchName.trim()) params.name = searchName.trim();
    params.page = 1;
    setSearchParams(params);
  };

  // --- OPEN / CLOSE MODAL ---
  const openModal = (type, data = null) => setModal({ type, data });
  const closeModal = () => setModal({ type: null, data: null });

  return (
    <>
      {/* BACKDROP */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
      )}

      {/* CREATE MODAL */}
      {modal.type === "create" && (
        <ModalCreateUser
          onClose={closeModal}
          refresh={() => getUser({ page: currentPage })}
        />
      )}

      {/* UPDATE MODAL */}
      {modal.type === "update" && (
        <ModalUpdateUser
          user={modal.data}
          onClose={closeModal}
          refresh={() => getUser({ page: currentPage })}
        />
      )}

      <div className="flex flex-col gap-5">
        {/* --- HEADER ---- */}
        <section className="flex flex-col gap-3 lg:flex-row lg:justify-between">
          <div className="flex items-center justify-between flex-wrap gap-4 lg:flex-col lg:items-start lg:gap-2">
            <h1 className="font-medium text-xl">User List</h1>

            <button
              className="cursor-pointer bg-brand text-white flex items-center rounded-md px-5 py-2 gap-2 hover:bg-[#8b6c46]"
              onClick={() => openModal("create")}
            >
              <Plus className="w-5 h-5" />
              Add User
            </button>
          </div>

          {/* --- FILTER --- */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <SearchInput
                label="Search User"
                placeholder="Enter User Fullname"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onEnter={handleSearch}
                fullWidth
                icon={<SearchIcon sx={{ color: "#9ca3af", mr: 1 }} />}
              />

              <button
                className="cursor-pointer bg-brand text-white flex items-center rounded-md px-5 py-2 gap-2 hover:bg-[#8b6c46]"
                onClick={handleSearch}
              >
                <Funnel className="w-7 h-7" />
                Filter
              </button>
            </div>
          </div>
        </section>

        {/* --- TABLE --- */}
        <section className="p-4 bg-white rounded-lg border border-gray-300 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-left text-sm font-semibold">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">Image</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Email</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500 space-y-2">
                      <Search className="w-12 h-12 text-gray-300" />
                      <p className="text-lg font-semibold">User not found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((u, i) => (
                  <tr
                    key={u.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 text-gray-500 ">
                      {(currentPage - 1) * limit + (i + 1)}
                    </td>

                    <td className="p-3">
                      {u.photo ? (
                        <img
                          src={u.photo}
                          alt={u.fullname}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <span>
                          <img
                            src="/default-profile.webp"
                            alt={u.fullname}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-gray-500">{u.fullname}</td>
                    <td className="p-3">{u.phone || "-"}</td>
                    <td className="p-3 text-sm">{u.address || "-"}</td>
                    <td className="p-3 text-gray-500">{u.email}</td>

                    <td className="p-3">
                      <div className="inline-flex gap-3 items-center justify-center">
                        <button
                          className="cursor-pointer"
                          onClick={() => openModal("update", u)}
                        >
                          <EditIcon className="w-5 h-5 text-blue-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* --- PAGINATION --- */}
        <div className="my-8">
          <Paginations
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={(page) => {
              const params = {};
              if (searchName.trim()) params.name = searchName.trim();
              params.page = page;

              setSearchParams(params);
              getUser(params);
              setCurrentPage(page);
            }}
            siblingCount={1}
            boundaryCount={0}
          />
        </div>
      </div>
    </>
  );
}

export default UserAdmin;
