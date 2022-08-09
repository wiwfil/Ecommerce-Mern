import Skeleton from "react-loading-skeleton";

const HistorySkeleton = ({ orders }) => {
  return Array(orders)
    .fill(0)
    .map((item, i) => (
      <div className="history__order" key={i}>
        <div className="history__orderid">
          <span>Order ID:</span>
          <Skeleton width={100} baseColor="#545257" highlightColor="#29272C" />
        </div>

        <div className="history__orderid">
          <span>Date:</span>
          <Skeleton width={100} baseColor="#545257" highlightColor="#29272C" />
        </div>

        <div className="history__orderid">
          <span>Total:</span>
          <Skeleton width={100} baseColor="#545257" highlightColor="#29272C" />
        </div>
        <div className="history__products__wrapper">
          <span>Products:</span>
          <div className="history__products">
            <>
              <hr className="line" />
              <div className="history__product">
                <Skeleton
                  width={60}
                  height={60}
                  baseColor="#545257"
                  highlightColor="#29272C"
                />
                <Skeleton
                  width={100}
                  baseColor="#545257"
                  highlightColor="#29272C"
                />
                <div className="history__product__row">
                  <span>Quantity : </span>
                  <Skeleton
                    width={100}
                    baseColor="#545257"
                    highlightColor="#29272C"
                  />
                </div>
                <div className="history__product__row">
                  <span>Price : </span>
                  <Skeleton
                    width={100}
                    baseColor="#545257"
                    highlightColor="#29272C"
                  />
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    ));
};

export default HistorySkeleton;
