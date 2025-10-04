
---

# Metal Node - Validator Setup & Monitoring Guide

## 🎉 Your Metal Node is Successfully Running!

Your Metal node has been installed and is fully operational. This guide will help you set up validation and access your monitoring dashboard.

---

## 📋 Your Node Information

### Essential Node Details

* **NodeID**: `NodeID-J5vkasUAG43nuowJRx4cNK3ATBaie28WJ`
* **Public Key**:
  `0x96e7cb580bcd8b05960a8ef15e094a77b51691fc2a562d4b6c585b73957320fdbea37e96f31e14b8d9dee015c207ba78`
* **Proof of Possession (Signature)**:
  `0x8a312d556ea61236c04e7fe49cfb3797ff1322c04a867c10d055bdbfaf5255aeff33e991b248a3dbd5876fe22d6e1ac512691212fba215c6033894be6bc16e0f4852fd7e190d2d7a57964f6d7963201847ff730f3a75fcee3f17c2bdb91e2cef`
* **Server IP**: `148.113.207.136`

### Monitoring Access

* **Grafana Dashboard**: `http://148.113.207.136:3000`
* **Prometheus Metrics**: `http://148.113.207.136:9090`
* **Login Credentials**: `admin / admin` (change on first login)

---

## 🚀 Setting Up Your Validator

Think of it as **4 super simple steps**:

### Step 1: Create Your Wallet

* [Metal Wallet](https://wallet.metalblockchain.org/)
* Make a new wallet and **write down your seed phrase** safely

### Step 2: Fund Your Wallet

* Send METAL tokens to your **C-Chain address** (Contract Chain)

### Step 3: Move Tokens to the P-Chain

* In your wallet, go to **Cross-Chain Transfer**
* Move tokens **C → P** (you can only stake on the P-Chain)

### Step 4: Add Your Node as a Validator

1. Go to **Earn → Validate → Add Validator**
2. Enter your details:

   ```
   NodeID: NodeID-J5vkasUAG43nuowJRx4cNK3ATBaie28WJ
   Public Key: 0x96e7cb580bcd8b05960a8ef15e094a77b51691fc2a562d4b6c585b73957320fdbea37e96f31e14b8d9dee015c207ba78
   Proof of Possession: 0x8a312d556ea61236c04e7fe49cfb3797ff1322c04a867c10d055bdbfaf5255aeff33e991b248a3dbd5876fe22d6e1ac512691212fba215c6033894be6bc16e0f4852fd7e190d2d7a57964f6d7963201847ff730f3a75fcee3f17c2bdb91e2cef
   ```
3. Set parameters:

   * Stake ≥ 2,000 METAL (2,500+ recommended for fees)
   * Delegation Fee: 2–10%
   * Validation Period: 2 weeks → 1 year
4. Confirm and submit transaction

✅ Done! Your node is now validating.

---

## 🔍 Verify Status

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id": 1,
    "method": "platform.getCurrentValidators"
}' -H 'content-type:application/json' https://api.metalblockchain.org/ext/bc/P
```

Check if your **NodeID-J5vkasUAG43nuowJRx4cNK3ATBaie28WJ** shows up in the validator list.

---

## 📊 Monitoring Your Node

### Grafana Access

* Open: `http://<IP_ADDRESS>:3000`
* Login: `admin / admin` → change immediately
* View dashboards for: Node health, peers, resources, validation status

### Key Metrics to Watch

* ✅ Uptime ≥80%
* ✅ Bootstrap status = synced
* ✅ Active peers
* ✅ CPU/memory usage stable

---

## 🔧 Node Management Commands

```bash
# Connect
ssh metaluser@<IP_ADDRESS>

# Status
sudo systemctl status metalgo

# Logs
sudo journalctl -u metalgo -f --lines=50

# Bootstrap check
curl -X POST --data '{"jsonrpc":"2.0","id":1,"method":"info.isBootstrapped","params":{"chain":"P"}}' \
-H 'content-type:application/json' 127.0.0.1:9650/ext/info
```

---

## 💰 Validator Rewards

* **APR Range**: ~7–11% depending on stake, uptime, and network
* Rewards are paid **at the end of your validation period**
* You also earn **delegation fees (2–10%)** from others who delegate to your node

👉 Example: Stake **2,000 METAL for 1 year** at 9% APR → you earn ~**180 METAL**.

---

## 🛡 Security Best Practices

* Backup `staker.key` & `staker.crt` (keep offline)
* Restrict SSH access, enable firewall
* Regularly update OS & node software
* Monitor Grafana weekly

---

## 🎯 Next Steps Checklist

* [ ] Change Grafana password
* [ ] Add validator via Core Wallet
* [ ] Confirm validator in API/Grafana
* [ ] Monitor uptime & resources
* [ ] Update node software monthly

**Your Metal node is ready for validation! 🚀**

---

