import Camelot from "./camelot";

var Events = new Camelot();
let first = ({ name }) => `foo ${name}`;
Events.on("foo", first);
Events.on("foo", ({ name }) => `bar ${name}`);
Events.on("foo", ({ name }) => `baz ${name}`);
Events.on("bar", ({ name }) => console.log(`bazinga ${name}`));
Events.on("baz", (name, address) => console.log(`${name}: ${address}`));

Events.before("bar", () => console.log("before"));
Events.after("bar", (results) => console.log("after", results));

Promise.all(Events.trigger("foo", { name: "bazinga" }))
  .then((values) => {
    console.log(values);

    // Events.off("foo", first);

    //Events.off("foo");

    //console.log(Events.topics);
  });

Events.trigger("bar", { name: "foo" });
Events.trigger("baz", "jonathan", 37179);
