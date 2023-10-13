<script setup lang="ts"></script>

<template>
  <div class="footer-wrapper">
    <footer class="footer">
      <img
        src="/images/footer-image.png"
        alt="footer-image"
        class="footer-image"
      />
      <div class="footer-content">
        <p>
          <span>İletişim</span><br />
          Adres: Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2
          Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul
        </p>
        <span>Email: bilgi@tesodev.com</span>
      </div>
      <img
        src="/images/google-map.png"
        alt="tesodev-location"
        class="google-map"
      />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  background-color: var(--color-secondary);
  width: 100%;
  margin-top: 60px;
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 60px;
    color: var(--color-white);
    .footer-image {
      widows: 217px;
      height: 180px;
    }
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 48px;
      max-width: 428px;
      width: 100%;
      padding-left: 24px;
      padding-right: 32px;
      p {
        color: var(--color-white);
        span {
          font-weight: 700;
        }
      }
      span {
        font-weight: 700;
      }
    }
    .google-map {
      widows: 468px;
      height: 220px;
    }
  }
}
</style>
