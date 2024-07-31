import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PlaceListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places);
  const token = useSelector((state) => state.token);

  const getPlaces = async () => {
    const response = await fetch("http://localhost:3001/places", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPlaces({ places: data }));
  };

  useEffect(() => {
    getPlaces();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {places.map(
        ({
          _id,
          name,
          address,
          description,
          category,
          picturePath,
        }) => (
          <PlaceWidget
            key={_id}
            placeId={_id}
            placeName={name}
            placeAddress={address}
            description={description}
            category={category}
            picturePath={picturePath}
          />
        )
      )}
    </>
  );
};

export default PlaceListWidget;