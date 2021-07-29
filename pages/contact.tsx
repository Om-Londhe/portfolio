import { TextareaAutosize } from "@material-ui/core";
import { DoneOutlineRounded, SendRounded } from "@material-ui/icons";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { pageAnimationVariants } from "../services/animations/common";
import {
  contactFormAnimationVariants,
  contactFormInputAnimationVariants,
  contactFormSubmitButtonAnimationVariants,
} from "../services/animations/contact";
import { db } from "../services/firebase";
import contactStyles from "../styles/pages/Contact.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacted, setContacted] = useState(false);

  const onContactInformationSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await db.collection("Contact").add({
      name,
      email,
      description,
    });
    setName("");
    setEmail("");
    setDescription("");
    setLoading(false);
    setContacted(true);
  };

  return (
    <motion.div
      className={contactStyles.contact}
      variants={pageAnimationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.form
        onSubmit={(e) => onContactInformationSubmit(e)}
        className={contactStyles.form}
        variants={contactFormAnimationVariants}
      >
        <input type="text" hidden value="DevOM" readOnly />
        <motion.div
          className={contactStyles.inputContainer}
          variants={contactFormInputAnimationVariants}
          transition={{
            delay: 1.4,
            duration: 1.1,
          }}
        >
          <label id="name-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className={contactStyles.input}
            type="text"
            autoComplete="none"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </motion.div>
        <motion.div
          className={contactStyles.inputContainer}
          variants={contactFormInputAnimationVariants}
          transition={{
            delay: 1.6,
            duration: 1.1,
          }}
        >
          <label id="email-label" htmlFor="email">
            Email <small>(optional)</small>
          </label>
          <input
            id="email"
            className={contactStyles.input}
            type="email"
            autoComplete="off"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={false}
          />
        </motion.div>
        <motion.div
          className={contactStyles.inputContainer}
          variants={contactFormInputAnimationVariants}
          transition={{
            delay: 1.8,
            duration: 1.1,
          }}
        >
          <label id="description-label" htmlFor="description">
            Description
          </label>
          <TextareaAutosize
            id="description"
            className={contactStyles.input}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </motion.div>
        {contacted ? (
          <motion.div
            className={contactStyles.doneContainer}
            variants={contactFormSubmitButtonAnimationVariants}
          >
            <DoneOutlineRounded className={contactStyles.doneIcon} />
            <p>Contacted Successfully</p>
          </motion.div>
        ) : loading ? (
          <motion.div
            className={contactStyles.contactLoader}
            variants={contactFormSubmitButtonAnimationVariants}
          >
            <SendRounded className={contactStyles.contactLoaderIcons} />
            <SendRounded className={contactStyles.contactLoaderIcons} />
            <SendRounded className={contactStyles.contactLoaderIcons} />
            <SendRounded className={contactStyles.contactLoaderIcons} />
          </motion.div>
        ) : (
          <motion.button
            type="submit"
            className={contactStyles.submitButton}
            variants={contactFormSubmitButtonAnimationVariants}
          >
            <p>Contact</p>
            <SendRounded className={contactStyles.sendIcon} />
          </motion.button>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
