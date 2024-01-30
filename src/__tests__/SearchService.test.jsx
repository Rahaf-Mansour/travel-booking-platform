import { searchAPI } from "../services/searchService";
import axiosInstance from "../Axios/axiosInstance";

jest.mock("../Axios/axiosInstance", () => ({
  get: jest.fn(),
}));

describe("searchAPI", () => {
  it("fetches search results based on parameters", async () => {
    const responseData = [
      {
        hotelId: 1,
        hotelName: "Plaza Hotel",
        starRating: 5,
        latitude: 12.32342342,
        longitude: 32.23245675,
        roomPrice: 100.0,
        roomType: "Double",
        cityName: "Ramallah",
        roomPhotoUrl:
          "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        discount: 0.2,
        amenities: [
          {
            id: 0,
            name: "wifi",
            description: "Very fast wifi in the room.",
          },
          {
            id: 1,
            name: "Room Service",
            description: "Very Fast room service available.",
          },
        ],
      },
    ];

    axiosInstance.get.mockResolvedValueOnce({ data: responseData });

    const searchParams = {
      city: "Ramallah",
      checkInDate: "2024-01-31",
      checkOutDate: "2024-02-01",
      adults: 2,
      children: 0,
      numberOfRooms: 1,
    };

    const data = await searchAPI(searchParams);

    expect(axiosInstance.get).toHaveBeenCalledWith(`/home/search`, {
      params: searchParams,
    });

    expect(data).toEqual(responseData);
  });
});
