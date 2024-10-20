"use client";
import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AccordionComponent from "./AccordionComponent";

const drawerBleeding = 0;

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor:
        theme.palette.mode === "light"
            ? grey[100]
            : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

function Drawlerbottom({ open, setOpen }) {

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <Root>
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(85% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />

            <SwipeableDrawer
                className="border-radius-drawler"
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                </StyledBox>
                <div className=" w-full bg-white rmdp-shadow rounded-lg overflow-auto boxShadow vazirMedium h-full p-5">

                <AccordionComponent setOpen={setOpen} />
                </div>
            </SwipeableDrawer>
        </Root>
    );
}

export default Drawlerbottom;
