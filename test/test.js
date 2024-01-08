const mongoose = require("mongoose");
const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const {createProfile, getProfileById} = require("../services/profile");
const {createComment, getComment, actionComment} = require("../services/comment")

beforeAll(async () => {
    await connectDB();
  });
   
  afterAll(async () => {
    await dropDB();
  });

  
  describe("Profile Model", () => {
    it("should create a profile successfully", async () => {
      let profileData = {
        "name": "fawwaz",
        "description": "description",
        "mbti": "infj",
        "enneagram": "1v2",
        "variant": "variant",
        "tritype": "725",
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png"
      };
      const newProfile = await createProfile(profileData);
      let id = newProfile._id;
      expect(newProfile._id).toBeDefined();
    });

    it("should fail when create profile without name field", async () => {
      let profileData = {
        "description": "description",
        "mbti": "infj",
        "enneagram": "1v2",
        "variant": "variant",
        "tritype": "725",
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png"
      };
      try{
        const newProfile = await createProfile(profileData);
      } catch(error){
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      }
    })

    it("should success get profile by id", async () => {
      let profileData = {
        "name": "fawwaz",
        "description": "description",
        "mbti": "infj",
        "enneagram": "1v2",
        "variant": "variant",
        "tritype": "725",
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png"
      };
      const newProfile = await createProfile(profileData);
      let id = newProfile._id;
      const result = await getProfileById(id);
      expect(result).toBeDefined();
    })
  });

describe("Comment model", () => {
    it("should create comment succesfully", async () => {
      const data = {
        "comment": "test",
        "mbti": "enfj"
      }
      const {comment, mbti, enneagram, zodiac} = data;
      const newComment = await createComment(comment, mbti, enneagram, zodiac);
      let id = newComment._id;
      expect(newComment._id).toBeDefined();
    })

    it("should fail when create comment without comment field", async () => {
      const data = {
        "mbti": "enfj"
      }
      const {comment, mbti, enneagram, zodiac} = data;
      try{
        const newComment = await createComment(comment, mbti, enneagram, zodiac);
      } catch(error){
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      }
    })

    it("should success get comment", async () => {
      const data = {
        "comment": "test",
        "mbti": "enfj"
      }
      const {comment, mbti, enneagram, zodiac} = data;
      const newComment = await createComment(comment, mbti, enneagram, zodiac);

      expect(newComment).toBeDefined()
    })
})


  