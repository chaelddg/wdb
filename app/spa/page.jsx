
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import getListings from "../actions/getListings";

const Spa = async () => {
  // let listings = [1,2,3,4,5];
  let listings = await getListings();
  console.log('listings => async', listings)
  if (listings.length == 0) {
    return null;
  }

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
          <ListingCard listings={listings} />
        </div>
      </Container>
    </ClientOnly>
  )
};

export default Spa;