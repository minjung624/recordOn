import { useState } from "react";
import explore_data from "../../../data/explore-data";
import { Link } from "react-router-dom";
import InputRange from "../../../ui/InputRange";

 

// data
const categories = [
	"All",
	...new Set(explore_data.map((item) => item.category)),
];
const perView = 6;

const Explore = () => {
	 
	const maxPrice = 450;
	const [priceValue, setPriceValue] = useState([0, maxPrice]);

	const handleChanges = (val: number[]) => {
		setPriceValue(val);
	};

	const [activeCategory, setActiveCategory] = useState("All");
	const [items, setItems] = useState(explore_data);

	const filterItems = (cateItem: string) => {
		setActiveCategory(cateItem);
		if (cateItem === "All") {
			return setItems(explore_data);
		} else {
			const findItems = explore_data.filter((findItem) => {
				return findItem.category == cateItem;
			});
			setItems(findItems);
		}
	};

	return (
		<>
			<main className="explore">
				<section className="search py-12">
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="form-inner w-100 d-flex align-items-center gap-8 radius-24">
							<img
								src="/assets/svg/search.svg"
								alt="search"
								className="shrink-0"
							/>
							<input
								type="search"
								className="input-search input-field"
								placeholder="Search..."
							/>
							<div className="filter shrink-0">
								<button
									type="button"
									className="d-flex align-items-center"
									data-bs-toggle="modal"
									data-bs-target="#filterModal"
								>
									<img src="/assets/svg/filter-black.svg" alt="filter" />
								</button>
							</div>
						</div>
					</form>
				</section>

				<section className="all-place py-12">
					<ul className="place-filter-btns d-flex align-items-center tab-list gap-12 w-100 scrollbar-hidden">
						{categories.map((cate, i) => (
							<li
								key={i}
								className={`${cate === activeCategory ? "active" : ""}`}
							>
								<button onClick={() => filterItems(cate)}>{cate}</button>{" "}
							</li>
						))}
					</ul>

					<div id="place-cards" className="grid">
						{items.slice(0, perView).map((item, i) => (
							<div key={i} className="place-card mix popular frequent">
								<Link to="/vacation-details">
									<div className="image position-relative">
										<img
											src={item.img}
											alt="desert"
											className="img-fluid w-100 overflow-hidden radius-8"
										/>
										<span className="d-flex align-items-center justify-content-center rounded-full">
											<img src={item.wishlist} alt="icon" />
										</span>
									</div>
									<div className="content">
										<h4>{item.title}</h4>
										<p className="d-flex align-items-center gap-04 location">
											<img src="/assets/svg/map-marker.svg" alt="icon" />
											{item.location}
										</p>
										<div className="price d-flex align-items-center justify-content-between">
											<h3>${item.price}</h3>
											<p className="d-flex align-items-center gap-04">
												<img src="/assets/svg/star-yellow.svg" alt="icon" />
												{item.rating} <span>({item.totalRating})</span>
											</p>
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</section>
			</main>

			<footer className="bottom-nav">
				<ul className="d-flex align-items-center justify-content-around w-100 h-100">
					<li>
						<Link to="/home">
							<img src="/assets/svg/bottom-nav/home.svg" alt="home" />
						</Link>
					</li>
					<li>
						<Link to="/explore">
							<img
								src="/assets/svg/bottom-nav/category-active.svg"
								alt="category"
							/>
						</Link>
					</li>
					<li>
						<Link to="/ticket-booked">
							<img src="/assets/svg/bottom-nav/ticket.svg" alt="ticket" />
						</Link>
					</li>
					<li>
						<Link to="/wishlist">
							<img src="/assets/svg/bottom-nav/heart.svg" alt="heart" />
						</Link>
					</li>
					<li>
						<Link to="/user-profile">
							<img src="/assets/svg/bottom-nav/profile.svg" alt="profile" />
						</Link>
					</li>
				</ul>
			</footer>

			<div
				className="modal fade filterModal bottomModal"
				id="filterModal"
				tabIndex={-1}
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="modal-close rounded-full"
								data-bs-dismiss="modal"
								aria-label="Close"
							>
								<img src="/assets/svg/close-black.svg" alt="Close" />
							</button>
							<h1 className="modal-title">Filter</h1>
						</div>
						<div className="modal-body">
							<div className="pb-12">
								<h4 className="content-title">Price Range</h4>
								<div className="filter-range">
									<InputRange
										MAX={maxPrice}
										MIN={0}
										STEP={1}
										values={priceValue}
										handleChanges={handleChanges}
									/>
									<div className="price-range w-100 d-flex align-items-center justify-content-between">
										<span
											className="input-range"
											onChange={() => handleChanges}
										>
											${priceValue[0]} - ${priceValue[1]}
										</span>
									</div>
								</div>
							</div>

							<div className="py-12">
								<h4 className="content-title">Popular Filters</h4>
								<ul className="popular-filters">
									<li>
										<label htmlFor="hotel" className="filter-label">
											<input type="checkbox" id="hotel" />
											Hotels (340)
										</label>
									</li>
									<li>
										<label htmlFor="pool" className="filter-label">
											<input type="checkbox" id="pool" defaultChecked />
											Swimming Pool (340)
										</label>
									</li>
									<li>
										<label htmlFor="stars" className="filter-label">
											<input type="checkbox" id="stars" />5 stars (100)
										</label>
									</li>
									<li>
										<label htmlFor="bathroom" className="filter-label">
											<input type="checkbox" id="bathroom" />
											Private Bathroom (200)
										</label>
									</li>
									<li>
										<label htmlFor="breakfast" className="filter-label">
											<input type="checkbox" id="breakfast" />
											Breakfast Included (115)
										</label>
									</li>
									<li>
										<label htmlFor="kitchen" className="filter-label">
											<input type="checkbox" id="kitchen" />
											Kitchen (10)
										</label>
									</li>
								</ul>
							</div>

							<div className="py-12">
								<h4 className="content-title">Star Rating</h4>
								<ul className="star-rating">
									<li>
										<label htmlFor="star1" className="filter-label">
											<input type="radio" name="star" id="star1" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
										</label>
									</li>
									<li>
										<label htmlFor="star2" className="filter-label">
											<input type="radio" name="star" id="star2" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
										</label>
									</li>
									<li>
										<label htmlFor="star3" className="filter-label">
											<input type="radio" name="star" id="star3" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
										</label>
									</li>
									<li>
										<label htmlFor="star4" className="filter-label">
											<input
												type="radio"
												name="star"
												id="star4"
												defaultChecked
											/>
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
										</label>
									</li>
									<li>
										<label htmlFor="star5" className="filter-label">
											<input type="radio" name="star" id="star5" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
											<img src="/assets/svg/star-yellow.svg" alt="star" />
										</label>
									</li>
								</ul>
							</div>

							<div className="py-12">
								<Link
									to="/search-result"
									className="btn-primary apply-filter-btn"
								>
									Apply Filter
								</Link>
							</div>

							<div className="pt-12">
								<button
									type="button"
									className="clear-all-btn"
									data-bs-dismiss="modal"
									aria-label="Close"
								>
									Clear All
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Explore;
