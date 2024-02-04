
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

const Spa = () => {
  let listings = [1,2,3,4,5];

  // if (listings.length == 0) {
  //   return null;
  // }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing) => {
            return (
              <ListingCard key={listing} />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
};

export default Spa;