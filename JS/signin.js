/**
 * Onboarding On-Click Navigation Funnel Controller Engine
 * Strictly client-side routing with zero data transmission or credential saving.
 */
document.addEventListener("DOMContentLoaded", () => {
  const stageContainer = document.getElementById("funnelStage");
  
  // Safe input element referencing
  const inputEntryEmail = document.getElementById("demo_account_id");
  const formEmailEntry = document.getElementById("formEmailEntry");
  const otpFields = document.querySelectorAll(".otp-digit-field");
  const otpErrorAlert = document.getElementById("otpErrorAlert");

  // Onboarding Accordion Open/Collapse Controller
  const helpTriggerToggle = document.getElementById("helpTriggerToggle");
  const helpDrawerPanel = document.getElementById("helpDrawerPanel");
  
  if (helpTriggerToggle && helpDrawerPanel) {
    helpTriggerToggle.addEventListener("click", () => {
      helpDrawerPanel.classList.toggle("open");
    });
  }

  // Pull local email address automatically from global state caches
  const cachedMail = localStorage.getItem("userSignupEmail");
  if (cachedMail && inputEntryEmail) {
    inputEntryEmail.value = cachedMail;
  }

  // --- STAGE 1 ACTION: SUBMIT RUN ENGINE ---
  if (formEmailEntry) {
    formEmailEntry.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const targetedEmail = inputEntryEmail ? inputEntryEmail.value.trim() : "";
      if (!targetedEmail) return;

      // Temporary local session state only
      localStorage.setItem("userSignupEmail", targetedEmail);
      
      // Sync current dynamic email strings across all UI blocks
      document.querySelectorAll(".display-email-target").forEach(el => {
        el.textContent = targetedEmail;
      });

      // Advance state panel display layout metrics
      if (stageContainer) {
        stageContainer.setAttribute("data-current-state", "OTP_VERIFY");
        
        // Focus first digit field
        setTimeout(() => {
          if (otpFields.length > 0) otpFields[0].focus();
        }, 50);
      }
    });
  }

  // Auto-shifting keyboard focus for 4x4 OTP code fields
  otpFields.forEach((field, idx) => {
    field.addEventListener("input", () => {
      // Force values to numbers only
      field.value = field.value.replace(/[^0-9]/g, '');
      
      if (field.value.length === 1 && idx < otpFields.length - 1) {
        otpFields[idx + 1].focus();
      }
      evaluateOtpInputCompletion();
    });

    field.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && field.value.length === 0 && idx > 0) {
        otpFields[idx - 1].focus();
      }
    });
  });

  // --- STAGE 2 ACTION: EVALUATE PIN MATCH ---
  function evaluateOtpInputCompletion() {
    const fullCodeString = Array.from(otpFields).map(f => f.value).join("");
    
    if (fullCodeString.length === 4) {
      // Demo code '1234' advances successfully
      if (fullCodeString === "1234") {
        if (otpErrorAlert) otpErrorAlert.style.display = "none";
        
        if (stageContainer) {
          stageContainer.setAttribute("data-current-state", "LINK_COMPLETE");
        }
      } else {
        // Flash error notification and reset fields
        if (otpErrorAlert) otpErrorAlert.style.display = "flex";
        otpFields.forEach(f => f.value = "");
        if (otpFields[0]) otpFields[0].focus();
      }
    }
  }

  // Change Button Switchback Engine Loop
  document.querySelectorAll(".funnel-inline-change-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (stageContainer) stageContainer.setAttribute("data-current-state", "EMAIL_ENTRY");
      if (inputEntryEmail) inputEntryEmail.focus();
      
      if (otpErrorAlert) otpErrorAlert.style.display = "none";
      otpFields.forEach(f => f.value = "");
    });
  });
});

// 5. JavaScript function to redirect user to home page/demo dashboard without saving data
window.handleDemoDashboardRedirect = function() {
  // Safe client-side redirect for portfolio demo
  window.location.href = "index.html";
};
