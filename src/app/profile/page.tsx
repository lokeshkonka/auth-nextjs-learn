export default function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState<any>(null);

  const logout = async () => {
    try {
      const response = await axios.post(
        "/api/users/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/profile", {
          withCredentials: true,
        });
        setData(response.data);
        console.log("User details fetched successfully:", response.data);

        if (response.status === 200) {
          console.log("User details:", response.data.user);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
      <h1>{data && data.user ? data.user.name : "No user data available"}</h1>
    </div>
  );
