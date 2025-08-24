import React from "react";
import { Navbar, Nav, Container, NavDropdown, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../app/useUserStore";


const Header = () => {
    const navigate = useNavigate();
    const { user, clearUser } = useUserStore();

    const handleMenuClick = (setting) => {
        if (setting === "Logout") {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("profile");
            clearUser();

            navigate("/login");
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                {/* Brand Logo */}
                <Navbar.Brand as={Link} to="/">
                    <strong>Product</strong>
                </Navbar.Brand>

                {/* Mobile toggle button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Left Nav */}
                    <Nav className="me-auto">
                        {/* Example navigation links */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    </Nav>

                    {/* Right side (User) */}
                    {user ? (
                        <Nav>
                            <NavDropdown
                                title={
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        {user?.profile ? (
                                            <Image
                                                src={`http://localhost:3005/${user?.profile}`}
                                                roundedCircle
                                                style={{ width: "35px", height: "35px", marginRight: "8px" }}
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: "35px",
                                                    height: "35px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#0d6efd", // bootstrap primary color
                                                    color: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontWeight: "bold",
                                                    marginRight: "8px",
                                                }}
                                            >
                                                {user?.username?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        {user?.username}
                                    </span>
                                }
                                id="basic-nav-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item onClick={() => handleMenuClick("Profile")}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleMenuClick("Account")}>Account</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleMenuClick("Dashboard")}>Dashboard</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleMenuClick("Logout")}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Button as={Link} to="/login" variant="outline-light">
                            Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
