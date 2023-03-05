import React, {useContext, useState} from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { AppContext } from "../context/state";

export const LastfmLoginModal = () => {
    const { lastfmUser,setLastfmUser } = useContext(AppContext);
    const [visible, setVisible] = React.useState(true);
    const [Name, setName] = useState<string>("");
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    return (
        <div>
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                       Please enter your <Text b size={18}>
                        lastfm
                    </Text> username in order to sync your activities with music
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        aria-label="lastfm-username"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/*<Row justify="space-between">*/}
                    {/*    <Checkbox>*/}
                    {/*        <Text size={14}>Remember me</Text>*/}
                    {/*    </Checkbox>*/}
                    {/*    <Text size={14}>Forgot password?</Text>*/}
                    {/*</Row>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color={"success"}
                        size={"sm"}
                        onPress={() => {
                            setLastfmUser(Name);
                            setName("");
                            closeHandler()
                        }}
                    >
                        Submit name
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
