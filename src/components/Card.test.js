import { render, screen, waitFor } from "@testing-library/react";
import Card from "./Card";

test("renders fallback for items with index less than 9", () => {
  render(
    <Card
      idx={8}
      photo={{
        id: 1,
        img_src: "nonsense.png",
        earth_date: "2020-01-01",
        rover: {
          name: "Curiosity",
        },
        camera: {
          full_name: "FHAZ",
        },
      }}
      likes={{
        1: true,
      }}
    />
  );
  const cardElement = screen.getByTestId("card-skeleton");
  expect(cardElement).toBeInTheDocument();
});

test("renders title", async () => {
  render(
    <Card
      idx={0}
      photo={{
        id: 1,
        img_src: "https://via.placeholder.com/150",
        earth_date: "2020-01-01",
        rover: {
          name: "Curiosity",
        },
        camera: {
          full_name: "FHAZ",
        },
      }}
      likes={{
        1: true,
      }}
    />
  );
  const cardElement = screen.getByText("Curiosity - FHAZ");
  expect(cardElement).toBeInTheDocument();
});
