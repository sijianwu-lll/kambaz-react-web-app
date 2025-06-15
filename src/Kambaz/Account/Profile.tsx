import { FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  };

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      alert("✅ Profile updated");
    } catch (e) {
      alert("Failed to update profile");
    }
  };

  // ✅ 修改后的 signout 函数：包含调用后端 API
  const signout = async () => {
    await client.signout();                      // 调用后端登出接口
    dispatch(setCurrentUser(null));              // 清空 Redux 用户状态
    navigate("/Kambaz/Account/Signin");          // 跳转回登录页
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Profile</h3>
      {profile && (
        <>
          <FormControl
            id="wd-username"
            className="mb-2"
            placeholder="Username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            type="password"
            placeholder="Password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            placeholder="First Name"
            value={profile.firstName || ""}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            placeholder="Last Name"
            value={profile.lastName || ""}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            placeholder="Email"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            id="wd-role"
            className="form-control mb-3"
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <Button
            id="wd-update-btn"
            variant="primary"
            className="w-100 mb-2"
            onClick={updateProfile}
          >
            Update
          </Button>

          <Button
            id="wd-signout-btn"
            variant="danger"
            className="w-100"
            onClick={signout}
          >
            Sign out
          </Button>
        </>
      )}
    </div>
  );
}
